from fastapi import APIRouter, HTTPException
from src.models.query import QueryRequest, QueryResponse
from src.utils.session_manager import sessions

router = APIRouter()


@router.post("", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    if request.session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    session = sessions[request.session_id]
    retriever = session["retriever"]
    chain = session["chain"]

    relevant_docs = await retriever.ainvoke(request.query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    combined_input = f"Context:\n{context}\n\nUser question: {request.query}"

    answer = await chain.ainvoke(
        {"input": combined_input},
        config={"configurable": {"session_id": request.session_id}},
    )

    return {"answer": answer.content}
