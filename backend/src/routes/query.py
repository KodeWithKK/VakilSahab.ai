from fastapi import APIRouter, HTTPException
from src.core.llm import llm
from src.models.query import QueryRequest, QueryResponse
from src.utils.session_manager import sessions

router = APIRouter()


def format_messages(messages):
    return "\n".join([f"{m.type.capitalize()}: {m.content}" for m in messages])


@router.post("", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    if request.session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    session = sessions[request.session_id]
    retriever = session["retriever"]
    memory = session["memory"]

    # Retrieve relevant documents
    relevant_docs = await retriever.ainvoke(request.query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    # Get formatted conversation history
    history_messages = memory.chat_memory.messages
    formatted_history = format_messages(history_messages)

    # Build prompt
    prompt = (
        f"You are a helpful assistant. Use the following information to answer the user's question:\n\n"
        f"{context}\n\n"
        f"Conversation history:\n{formatted_history}\n\n"
        f"User question: {request.query}\n\n"
        f"Respond in clear, conversational language using well-formatted Markdown. "
        f"Do not say 'Based on the context' or repeat the question."
    )

    # Get the answer from the LLM
    answer = await llm.ainvoke(prompt)

    # Save interaction to memory
    memory.save_context({"input": request.query}, {"output": answer.content})

    return {"answer": answer.content}
