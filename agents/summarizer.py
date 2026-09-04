# agents/summarizer.py
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

bart_tokenizer = None
bart_model = None
init_error = None
MODEL_ID = "sshleifer/distilbart-cnn-12-6"

def get_summarizer():
    global bart_tokenizer, bart_model, init_error
    if bart_model is None or bart_tokenizer is None:
        try:
            print(f"Loading {MODEL_ID}...")
            bart_tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
            
            # Use GPU if available, else CPU
            device = "cuda" if torch.cuda.is_available() else "cpu"
            bart_model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID).to(device)
            print("Summarization model loaded successfully.")
        except Exception as e:
            init_error = str(e)
            print("Error loading summarizer:", e)
    return bart_tokenizer, bart_model

def summarize_medical_text(text: str) -> str:
    """Uses facebook/bart-large-cnn to summarize clinical text effectively."""
    if not text or len(text.strip()) < 30:
        return "Text is too short to summarize effectively."
    
    tokenizer, model = get_summarizer()
    if not tokenizer or not model:
        return f"BART Summarization model failed to load. Error: {init_error}"
    
    # BART model has token limits, so we explicitly chop super long text to safe limits (approx 1024 tokens)
    short_text = text[:3500] 
    
    try:
        # Generate summary directly
        device = "cuda" if torch.cuda.is_available() else "cpu"
        inputs = tokenizer(
            short_text, 
            max_length=1024, 
            return_tensors="pt", 
            truncation=True
        ).to(device)
        
        summary_ids = model.generate(
            inputs["input_ids"],
            max_length=150, 
            min_length=40, 
            length_penalty=2.0, 
            num_beams=4, 
            early_stopping=True
        )
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary
    except Exception as e:
        return f"Summarization failed: {str(e)}"
