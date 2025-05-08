from typing import List, Optional

from fastapi import APIRouter, File, Form, UploadFile
from src.core.llm import get_llm_chain
from src.core.pinecone import load_pinecone_retriever
from src.core.redis import get_all_user_questions, redis_client
from src.models.query import QueryResponse
from src.utils.document_handler import process_files_and_build_index, save_upload_files

router = APIRouter()


@router.post("", response_model=QueryResponse)
async def process_query(
    query: str = Form(...),
    session_id: str = Form(...),
    files: Optional[List[UploadFile]] = File(None),
):
    redis_client.sadd("session:active ", session_id)

    if files:
        session_dir = f"temp/{session_id}"
        file_paths = await save_upload_files(session_dir, files)
        await process_files_and_build_index(file_paths, session_id)
        redis_client.sadd("session:with_docs", session_id)

    user_questions = get_all_user_questions(session_id)
    user_questions.append(query)
    retriver_query = "\n".join(user_questions)

    main_retriever = load_pinecone_retriever("MAIN")
    main_relevant_docs = await main_retriever.ainvoke(retriver_query)
    main_context = "\n\n".join([doc.page_content for doc in main_relevant_docs])

    session_context = ""
    if redis_client.sismember("session:with_docs", session_id):
        session_retriever = load_pinecone_retriever(session_id)
        session_relevant_docs = await session_retriever.ainvoke(retriver_query)
        session_context = "\n\n".join(
            [doc.page_content for doc in session_relevant_docs]
        )

    chain = get_llm_chain()

    combined_input = (
        f"System Context:\n{main_context}\n\n"
        f"Session Context:\n{session_context or 'None'}\n\n"
        f"User question: {query}"
    )

    answer = await chain.ainvoke(
        {"input": combined_input},
        config={"configurable": {"session_id": session_id}},
    )

    return {"answer": answer.content}
