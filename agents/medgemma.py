from transformers import pipeline
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize the pipeline globally so it loads once when the app starts
pipe = None
init_error = None

def init_medgemma():
    global pipe, init_error
    if pipe is None:
        try:
            print("Loading MedGemma model. This may take a while depending on hardware...")
            hf_token = os.getenv("HF_TOKEN")
            pipe = pipeline(
                "image-text-to-text", 
                model="google/medgemma-4b-it", 
                device_map="auto",
                token=hf_token
            )
            print("MedGemma loaded successfully.")
        except Exception as e:
            init_error = str(e)
            print(f"Error loading MedGemma: {e}")

def run_medgemma_inference(text_query: str, image_url: str = None) -> str:
    global pipe
    if pipe is None:
        init_medgemma()
    
    if pipe is None:
        return f"MedGemma Initialization Error: {init_error}"

    content = []
    if image_url:
        content.append({"type": "image", "url": image_url})
    
    content.append({"type": "text", "text": text_query})

    messages = [
        {
            "role": "user",
            "content": content
        },
    ]

    try:
        results = pipe(text=messages, max_new_tokens=256)
        if isinstance(results, list) and len(results) > 0:
             # Extract generated text; format may vary based on pipeline output
             if 'generated_text' in results[0]:
                 # Sometimes generated_text contains the whole prompt too. We might need to clean it.
                 # With chat templates, pipeline usually returns the ASSISTANT's message as a dict
                 gen_text = results[0]['generated_text']
                 if isinstance(gen_text, list):
                     # Usually the last message is the assistant's
                     return gen_text[-1].get('content', str(gen_text))
                 return str(gen_text)
        return str(results)
    except Exception as e:
        return f"MedGemma inference error: {str(e)}"
