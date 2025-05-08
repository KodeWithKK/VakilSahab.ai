from fastapi import APIRouter, HTTPException
from langchain.schema import AIMessage, HumanMessage
from src.core.redis import get_chat_history, redis_client

router = APIRouter()


@router.get("/list")
async def list_sessions():
    session_ids = redis_client.smembers("active_sessions")
    return {"sessions": session_ids}


@router.get("/history/{session_id}")
async def get_history(session_id: str):
    if not redis_client.sismember("active_sessions", session_id):
        raise HTTPException(status_code=404, detail="Session not found")

    redis_chat_history = get_chat_history(session_id)
    chat_history = []

    for msg in redis_chat_history:
        if isinstance(msg, HumanMessage):
            message = msg.content
            message = (
                message.split("User question: ")[-1]
                if "User question: " in message
                else message
            )
        elif isinstance(msg, AIMessage):
            message = msg.content
        else:
            continue

        chat_history.append({"type": msg.type, "message": message})

    return {"history": chat_history}


@router.get("/history/redis/{session_id}")
async def get_redis_history(session_id: str):
    if not redis_client.sismember("active_sessions", session_id):
        raise HTTPException(status_code=404, detail="Session not found")
    return {"history": get_chat_history(session_id)}


# @router.delete("/{session_id}")
# async def delete_session(session_id: str):
#     if session_id not in sessions:
#         raise HTTPException(status_code=404, detail="Session not found")

#     try:
#         pinecone_index.delete(filter={"session_id": session_id})
#         del sessions[session_id]
#         return {"message": f"Session {session_id} deleted"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error deleting session: {str(e)}")
