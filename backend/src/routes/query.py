from fastapi import APIRouter, HTTPException
from src.core.llm import get_llm_chain
from src.core.pinecone import load_pinecone_retriever
from src.core.redis import redis_client
from src.models.query import QueryRequest, QueryResponse

router = APIRouter()


@router.post("", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    if not redis_client.sismember("active_sessions", request.session_id):
        raise HTTPException(status_code=404, detail="Session not found")

    retriever = load_pinecone_retriever(request.session_id)
    chain = get_llm_chain()

    relevant_docs = await retriever.ainvoke(request.query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    combined_input = f"Context:\n{context}\n\nUser question: {request.query}"

    answer = await chain.ainvoke(
        {"input": combined_input},
        config={"configurable": {"session_id": request.session_id}},
    )

    return {"answer": answer.content}
