# routes/upload.py

import os
import shutil
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, BackgroundTasks
from supabase import create_client
from dotenv import load_dotenv

from services.ai_analysis import analyze_and_update
from auth.auth import verify_token  # your existing auth
from agents.summarizer import summarize_medical_text
from utils.extractor import extract_text_from_pdf
from agents.medgemma import run_medgemma_inference

load_dotenv()

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

UPLOAD_DIR = "uploads"
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"]


@router.post("/upload")
async def upload_report(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    user: dict = Depends(verify_token)
):
    try:
        # Validate file type
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=400, detail="Invalid file type")

        # Validate size
        file.file.seek(0, 2)
        size = file.file.tell()
        file.file.seek(0)

        if size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File too large")

        # Create folder
        Path(UPLOAD_DIR).mkdir(exist_ok=True)

        safe_name = file.filename.replace(" ", "_")
        file_path = os.path.join(UPLOAD_DIR, f"{user['id']}_{safe_name}")

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        if user["id"] == "mock_test_id_123":
            # Testing mock response without inserting into database
            
            raw_text = ""
            try:
                if file.content_type == "application/pdf":
                    raw_text = extract_text_from_pdf(file_path)
                elif file.content_type in ["image/jpeg", "image/png"]:
                    raw_text = run_medgemma_inference("Extract all visible clinical text and values exactly as written in this report.", file_path)
            except Exception as parse_e:
                raw_text = f"Could not parse file: {str(parse_e)}"
            
            # 2. Use facebook/bart-large-cnn summarizer to digest the text
            final_summary = summarize_medical_text(raw_text) if raw_text.strip() else "File appeared empty or unreadable."

            return {
                "message": "Report uploaded successfully.",
                "report_id": 999,
                "status": "analyzed",
                "summary": final_summary,
                "abnormalMarkers": ["Detected via OCR pipeline if applicable"]
            }

        # Insert DB record
        report = supabase.table("reports").insert({
            "user_id": user["id"],
            "role": user["role"],  # patient or doctor
            "file_path": file_path,
            "status": "processing"
        }).execute()

        report_id = report.data[0]["id"]

        # 🔥 Run AI in background
        background_tasks.add_task(
            analyze_and_update,
            report_id,
            file_path,
            user["role"]
        )

        return {
            "message": "Report uploaded. AI analysis started.",
            "report_id": report_id,
            "status": "processing"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))