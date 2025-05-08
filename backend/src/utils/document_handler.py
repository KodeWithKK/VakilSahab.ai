import shutil

from src.core.ocr import extract_text_from_file
from src.core.pinecone import build_pinecone_session
from src.utils.text_processing import split_chunks


async def process_files_and_build_index(file_paths, session_id):
    all_extracted_text = ""
    for file_path, file_name in file_paths:
        extracted_text = await extract_text_from_file(file_path, file_name, session_id)
        all_extracted_text += extracted_text + "\n"

    chunks = split_chunks(all_extracted_text)
    build_pinecone_session(chunks, session_id)
    shutil.rmtree(f"temp/{session_id}", ignore_errors=True)
