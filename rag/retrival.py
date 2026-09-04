# import os
# import re
# import requests
# from dotenv import load_dotenv
# from langchain_huggingface.embeddings import HuggingFaceEmbeddings
# from langchain_qdrant import QdrantVectorStore
# from groq import Groq

# load_dotenv()

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# MODEL_ID = "llama-3.1-8b-instant"
# QDRANT_URL = os.getenv("QDRANT_URL")
# COLLECTION_NAME = "cancer_rag"

# embedding_model = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )

# vector_db = QdrantVectorStore.from_existing_collection(
#     url=QDRANT_URL,
#     api_key=os.getenv("QDRANT_API_KEY_CLOUD"),
#     collection_name=COLLECTION_NAME,
#     embedding=embedding_model,
# )

# client = Groq(api_key=GROQ_API_KEY)

# # ----------------------------------------------------
# #         INTENT DETECTOR: DIAGNOSTIC ANALYSIS
# # ----------------------------------------------------
# def is_diagnostic_query(query: str):
#     q = query.lower()
#     patterns = [
#         r"malignant vs benign", r"mimicker", r"imaging features",
#         r"biomarker ratio", r"risk weightage", r"granuloma",
#         r"nodule", r"tuberculosis", r"sarcoidosis"
#     ]
#     return any(re.search(p, q) for p in patterns)

# def build_medical_context(docs):
#     seen = set()
#     chunks = []
#     for doc in docs:
#         content = doc.page_content.strip()
#         if content not in seen:
#             seen.add(content)
#             source = doc.metadata.get("source", "Medical Journal")
#             chunks.append(f"Source [{source}]: {content}")
#     return "\n\n".join(chunks)

# # ----------------------------------------------------
# #                MAIN DIAGNOSTIC FUNCTION
# # ----------------------------------------------------
# def analyze_cancer_case(user_query: str, vision_score=None):
#     """
#     Analyzes medical queries. Accepts an optional vision_score 
#     from your Teachable Machine endpoint.
#     """
    
#     # RAG Retrieval
#     docs = vector_db.max_marginal_relevance_search(user_query, k=5, fetch_k=20)
#     context = build_medical_context(docs)

#     # Optional: Integration with your Teachable Machine "Vision"
#     vision_block = ""
#     if vision_score:
#         vision_block = f"Teachable Machine Vision Score: {vision_score} (Probability of Malignancy)"

#     final_prompt = f"""
# You are a Medical Technical Analyst. Provide a formal clinical analysis.

# Clinical Research Context:
# {context}

# {vision_block}

# Structure your response:
# 1. Clinical Summary
# 2. Diagnostic Analysis (Distinguish between Malignant vs. Mimickers like TB/Sarcoidosis)
# 3. Biomarker & History Weighting (Factor in risk multipliers)
# 4. Technical Recommendation (Next steps for screening)

# User Query: {user_query}
# """

#     chat = client.chat.completions.create(
#         messages=[
#             {"role": "system", "content": "You are a specialist in early cancer detection and radiology."},
#             {"role": "user", "content": final_prompt},
#         ],
#         model=MODEL_ID,
#         max_tokens=1000,
#         temperature=0.15
#     )
#     return chat.choices[0].message.content



import os
import re
from dotenv import load_dotenv
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from groq import Groq

load_dotenv()

# ----------------------------------------------------
#                 ENV CONFIG
# ----------------------------------------------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY_CLOUD")
COLLECTION_NAME = "cancer_rag"
MODEL_ID = "openai/gpt-oss-120b"
DIAGNOSTIC_REFUSAL_MESSAGE = (
    "I can only help with cancer-related diagnostic questions that can be checked "
    "against this application's medical knowledge base. Please ask about a symptom, "
    "test result, report finding, biomarker, scan, screening, or cancer-risk concern."
)
RAG_UNAVAILABLE_MESSAGE = (
    "I could not retrieve supporting information from the medical knowledge base, "
    "so I cannot provide an evidence-grounded response right now. Please try again later "
    "or consult a qualified clinician."
)

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not set")

if not QDRANT_URL:
    raise ValueError("QDRANT_URL not set")

# ----------------------------------------------------
#           INITIALIZE GROQ CLIENT
# ----------------------------------------------------
client = Groq(api_key=GROQ_API_KEY)

# ----------------------------------------------------
#      LAZY LOAD VECTOR DB (Railway Safe)
# ----------------------------------------------------
def get_vector_store():
    try:
        embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        return QdrantVectorStore.from_existing_collection(
            collection_name=COLLECTION_NAME,
            embedding=embedding_model,
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
        )

    except Exception as e:
        print("Qdrant connection failed:", e)
        return None

# ----------------------------------------------------
#         INTENT DETECTOR
# ----------------------------------------------------
def is_diagnostic_query(query: str):
    q = query.lower()
    patterns = [
        r"\bdiagnos", r"\bmalignan", r"\bbenign", r"\bcancer\b",
        r"\btumou?r\b", r"\bnodule\b", r"\bmass\b", r"\blesion\b",
        r"\bbiopsy\b", r"\bpatholog", r"\bcytolog", r"\bbiomarker\b",
        r"\bmutation\b", r"\btmb\b", r"\bcbc\b", r"\bwbc\b", r"\brbc\b",
        r"\bscan\b", r"\bimaging\b", r"\bx[ -]?ray\b", r"\bmri\b",
        r"\bct\b", r"\bultrasound\b", r"\bmammogram\b", r"\bscreening\b",
        r"\brisk\b", r"\bsymptom", r"\breport\b", r"\btest result",
        r"\blab result", r"\bgranuloma\b", r"\btuberculosis\b", r"\bsarcoidosis\b"
    ]
    return any(re.search(p, q) for p in patterns)

def build_medical_context(docs):
    seen = set()
    chunks = []

    for doc in docs:
        content = doc.page_content.strip()
        if content not in seen:
            seen.add(content)
            source = doc.metadata.get("source", "Medical Journal")
            chunks.append(f"Source [{source}]: {content}")

    return "\n\n".join(chunks)

# ----------------------------------------------------
#        MAIN DIAGNOSTIC FUNCTION
# ----------------------------------------------------
def analyze_cancer_case(user_query: str, vision_score=None):

    vector_db = get_vector_store()
    if vector_db is None:
        return RAG_UNAVAILABLE_MESSAGE

    try:
        docs = vector_db.max_marginal_relevance_search(
            user_query, k=5, fetch_k=20
        )
        context = build_medical_context(docs)
    except Exception as e:
        print("RAG retrieval failed:", e)
        return RAG_UNAVAILABLE_MESSAGE

    if not context:
        return RAG_UNAVAILABLE_MESSAGE

    vision_block = ""
    if vision_score:
        vision_block = f"Teachable Machine Vision Score: {vision_score} (Probability of Malignancy)"


    final_prompt = f"""
You are an empathetic, expert Clinical Assistant.

Clinical Research Context (Retrieved from the internal Qdrant RAG database):
{context}

{vision_block}

User Query: {user_query}

Instructions:
1. Answer only from the retrieved context above. Do not use general knowledge to fill gaps.
2. Be concise, helpful, and professional. Never present a diagnosis as certain; recommend clinician review where appropriate.
3. If the retrieved context does not support an answer, say that clearly and ask for the relevant report value, test result, or scan finding.
4. Mention the relevant source filename(s) from the context in your answer.
"""

    chat = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a specialist in early cancer detection and radiology."},
            {"role": "user", "content": final_prompt},
        ],
        model=MODEL_ID,
        max_tokens=1000,
        temperature=0.15
    )

    return chat.choices[0].message.content
