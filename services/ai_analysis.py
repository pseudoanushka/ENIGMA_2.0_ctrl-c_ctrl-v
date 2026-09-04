# services/ai_analysis.py

from supabase import create_client
from utils.extractor import extract_text_from_pdf
from agents.summarizer import summarize_medical_text
from agents.medgemma import run_medgemma_inference

import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


async def analyze_and_update(report_id: str, file_path: str, role: str):
    try:
        # 1️⃣ Extract text from report
        raw_text = ""
        if file_path.endswith('.pdf'):
            raw_text = extract_text_from_pdf(file_path)
        else:
            raw_text = run_medgemma_inference("Extract all visible clinical text and values exactly as written in this report.", f"file:///{os.path.abspath(file_path)}")

        # 2️⃣ Run facebook/bart-large-cnn
        summary_result = "No readable text found."
        if raw_text and raw_text.strip():
             summary_result = summarize_medical_text(raw_text)

        response = summary_result

        # 4️⃣ Update DB
        supabase.table("reports").update({
            "status": "analyzed",
            "ai_result": response
        }).eq("id", report_id).execute()

    except Exception as e:
        supabase.table("reports").update({
            "status": "failed",
            "ai_result": str(e)
        }).eq("id", report_id).execute()