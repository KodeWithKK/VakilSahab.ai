from typing import List

from fastapi import APIRouter, BackgroundTasks, File, UploadFile
from src.core.pinecone import clear_session_docs
from src.utils.api_response import ApiResponse
from src.utils.document_handler import process_files_and_build_index, save_upload_files

router = APIRouter()


@router.post("/upload")
async def upload_main_documents(
    background_tasks: BackgroundTasks, files: List[UploadFile] = File(...)
):
    session_id = "MAIN"
    session_dir = f"temp/{session_id}"
    file_paths = await save_upload_files(session_dir, files)
    background_tasks.add_task(process_files_and_build_index, file_paths, session_id)
    return ApiResponse.success(message="Files uploaded. Processing started.")


@router.post("/clear")
async def clear_main_context():
    clear_session_docs("MAIN")
    return ApiResponse.success(message="Main context cleared.")
