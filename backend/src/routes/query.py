from fastapi import APIRouter, HTTPException
from src.core.llm import generate_answer
from src.models.query import QueryRequest, QueryResponse
from src.utils.session_manager import sessions

router = APIRouter()


@router.post("", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    if request.session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    retriever = sessions[request.session_id]["retriever"]
    relevant_docs = retriever.get_relevant_documents(request.query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    prompt = f"Answer the question based on the following context:\n\n{context}\n\nQuestion: {request.query}"
    answer = await generate_answer(prompt)

    sessions[request.session_id]["history"].append(
        {"role": "user", "content": request.query}
    )
    sessions[request.session_id]["history"].append(
        {"role": "assistant", "content": answer}
    )

    return {"answer": answer}
