import os
import shutil
from typing import List

from fastapi import UploadFile
from langchain.text_splitter import RecursiveCharacterTextSplitter
from src.core.ocr import extract_text_from_file
from src.core.pinecone import build_pinecone_session


async def save_upload_files(folder_name: str, files: List[UploadFile]):
    os.makedirs(folder_name, exist_ok=True)
    file_paths = []

    for file in files:
        file_path = os.path.join(folder_name, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        file_paths.append((file_path, file.filename))

    return file_paths


async def process_files_and_build_index(file_paths, session_id):
    all_extracted_text = ""
    for file_path, file_name in file_paths:
        extracted_text = await extract_text_from_file(file_path, file_name, session_id)
        all_extracted_text += extracted_text + "\n"

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_text(all_extracted_text)
    build_pinecone_session(chunks, session_id)

    print(f"{session_id} Documents indexed.")
    shutil.rmtree(f"tmp/{session_id}", ignore_errors=True)
