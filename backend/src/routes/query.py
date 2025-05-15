import json
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPBearer
from langchain.schema import HumanMessage
from langchain_core.runnables.history import RunnableWithMessageHistory
from src.core.clerk import get_user_id
from src.core.llm import get_llm_chain
from src.core.pinecone import load_pinecone_retriever
from src.core.redis import get_all_user_questions, redis_client
from src.utils.document_handler import process_files_and_build_index, save_upload_files

router = APIRouter()
security = HTTPBearer()


def create_session(user_id: str, session_name: str):
    session_id = str(uuid.uuid4())
    redis_client.sadd("sessions:active", session_id)
    redis_client.sadd(f"user:{user_id}:sessions", session_id)
    new_session_info = {
        "name": session_name,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "updatedAt": datetime.now(timezone.utc).isoformat(),
    }
    redis_client.hset(
        f"session:{session_id}:info",
        mapping=new_session_info,
    )
    new_session_info["id"] = session_id
    return new_session_info


async def stream_query(
    chain: RunnableWithMessageHistory,
    combined_input: str,
    session_id: str,
    new_session_info: dict = None,
    file_metadata: list = [],
):
    if new_session_info:
        yield f"{json.dumps({'event': 'new-session-info', 'data': new_session_info})}\n\n"

    human_message = HumanMessage(
        content=combined_input,
        additional_kwargs={
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "files": file_metadata,
        },
        id=str(uuid.uuid4()),
    )

    async for chunk in chain.astream(
        {"input": human_message},
        config={"configurable": {"session_id": session_id}},
    ):
        yield f"{json.dumps({'event': 'next-chunk', 'data': chunk.content})}\n\n"

    redis_client.hset(
        f"session:{session_id}:info",
        key="updatedAt",
        value=datetime.now(timezone.utc).isoformat(),
    )


@router.post("")
async def process_query(
    request: Request,
    query: str = Form(...),
    session_id: Optional[str] = Form(None),
    files: Optional[List[UploadFile]] = File(None),
):
    user_id = await get_user_id(request)
    new_session_info = None

    if not session_id:
        new_session_info = create_session(user_id, query)
        session_id = new_session_info["id"]

    if not redis_client.sismember(f"user:{user_id}:sessions", session_id):
        raise HTTPException(status_code=403, detail="Unauthorized request")

    file_metadata = []
    if files:
        session_dir = f"temp/{session_id}"
        file_paths = await save_upload_files(session_dir, files)
        await process_files_and_build_index(file_paths, session_id)
        redis_client.sadd("sessions:with_docs", session_id)
        file_metadata = [
            {"filename": f.filename, "content_type": f.content_type} for f in files
        ]

    user_questions = get_all_user_questions(session_id)
    user_questions.append(query)
    retriver_query = "\n".join(user_questions)

    main_retriever = load_pinecone_retriever("MAIN", 4)
    main_relevant_docs = await main_retriever.ainvoke(retriver_query)
    main_context = "\n\n".join([doc.page_content for doc in main_relevant_docs])

    session_context = ""
    if redis_client.sismember("sessions:with_docs", session_id):
        session_retriever = load_pinecone_retriever(session_id, 5)
        session_relevant_docs = await session_retriever.ainvoke(retriver_query)
        session_context = "\n\n".join(
            [doc.page_content for doc in session_relevant_docs]
        )

    chain = get_llm_chain()

    combined_input = (
        f"### RELEVANT SYSTEM CONTEXT FROM LEGAL CORPUS:\n{main_context}\n\n"
        f"### RELEVANT USER CONTEXT FROM UPLOADED DOCUMENT:\n{session_context or 'None'}\n\n"
        f"### USER QUESTION:\n{query}"
    )

    return StreamingResponse(
        stream_query(
            chain, combined_input, session_id, new_session_info, file_metadata
        ),
        media_type="text/event-stream",
    )
