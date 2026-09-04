from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from dotenv import load_dotenv
import os

load_dotenv()
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY_CLOUD")

DATA_FOLDER = Path(__file__).parent/"DATA"

all_docs = []
for pdf_file in DATA_FOLDER.glob("*.pdf"):
    print(f"loading.....{pdf_file.name}")
    loader = PyPDFLoader(str(pdf_file))
    docs = loader.load()

    for d in docs:
        d.metadata["source"] = pdf_file.name
    all_docs.extend(docs)

print(f"Total pages loaded : {len(all_docs)}")

# print(docs[0])

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)


chunks = text_splitter.split_documents(all_docs)
print(f"Total Chunks created {len(chunks)}")



from langchain_huggingface.embeddings import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


vector_store = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embedding_model,
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY_CLOUD"),
    collection_name="cancer_rag",
    batch_size=16
)

print("Indexing of MULTIPLE documents done successfully!")