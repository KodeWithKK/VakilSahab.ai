import shutil

from langchain.memory import ConversationBufferMemory
from langchain_huggingface import HuggingFaceEmbeddings
from src.core.ocr import extract_text_from_file
from src.core.pinecone import build_pinecone_index
from src.types.session import Session
from src.utils.text_processing import split_chunks

sessions: dict[str, Session] = {}
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


async def process_files_and_build_index(file_paths, session_id):
    all_extracted_text = ""
    for file_path, file_name in file_paths:
        extracted_text = await extract_text_from_file(file_path, file_name, session_id)
        all_extracted_text += extracted_text + "\n"

    chunks = split_chunks(all_extracted_text)
    retriever = build_pinecone_index(chunks, session_id, embedding_model)

    sessions[session_id] = {
        "retriever": retriever,
        "history": [],
        "memory": ConversationBufferMemory(return_messages=True),
    }
    shutil.rmtree(f"temp/{session_id}", ignore_errors=True)
