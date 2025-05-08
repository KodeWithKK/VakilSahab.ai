import os
import uuid
from typing import List

from fastapi import APIRouter, BackgroundTasks, File, UploadFile
from src.core.redis import redis_client
from src.utils.document_handler import process_files_and_build_index

router = APIRouter()


@router.post("")
async def upload_documents(
    background_tasks: BackgroundTasks, files: List[UploadFile] = File(...)
):
    session_id = str(uuid.uuid4())
    session_dir = f"temp/{session_id}"
    os.makedirs(session_dir, exist_ok=True)

    file_paths = []
    for file in files:
        file_path = os.path.join(session_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        file_paths.append((file_path, file.filename))

    redis_client.sadd("active_sessions", session_id)
    background_tasks.add_task(process_files_and_build_index, file_paths, session_id)
    return {"session_id": session_id, "message": "Files uploaded. Processing started."}
