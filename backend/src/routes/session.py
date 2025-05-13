from fastapi import APIRouter, HTTPException, Request
from langchain.schema import AIMessage, HumanMessage
from src.core.clerk import get_user_id
from src.core.pinecone import clear_session_docs
from src.core.redis import get_chat_history, redis_client
from src.utils.api_response import ApiResponse

router = APIRouter()


@router.get("/list")
async def list_sessions(request: Request):
    user_id = await get_user_id(request)
    print(user_id)

    user_sessions_ids = redis_client.smembers(f"user:{user_id}:sessions")
    user_sessions = []

    for session_id in user_sessions_ids:
        user_session = redis_client.hgetall(f"session:{session_id}:info")
        user_session["id"] = session_id
        user_sessions.append(user_session)

    return ApiResponse.success(data=user_sessions)


@router.get("/history/{session_id}")
async def get_history(request: Request, session_id: str):
    user_id = await get_user_id(request)

    if not redis_client.sismember("sessions:active", session_id):
        raise HTTPException(status_code=404, detail="Session not found")

    if not redis_client.sismember(f"user:{user_id}:sessions", session_id):
        raise HTTPException(status_code=403, detail="Unauthorized Request")

    redis_chat_history = get_chat_history(session_id)
    chat_history = []

    for msg in redis_chat_history:
        if isinstance(msg, HumanMessage):
            mssg_type = "user"
            message = msg.content
            message = (
                message.split("### USER QUESTION:\n")[-1]
                if "### USER QUESTION:\n" in message
                else message
            )
        elif isinstance(msg, AIMessage):
            mssg_type = "ai"
            message = msg.content
        else:
            continue

        chat_history.append({"type": mssg_type, "message": message})

    return ApiResponse.success(data=chat_history)


@router.get("/history/redis/{session_id}")
async def get_redis_history(session_id: str):
    if not redis_client.sismember("sessions:active", session_id):
        raise HTTPException(status_code=404, detail="Session not found")
    return ApiResponse.success(data=get_chat_history(session_id))


@router.delete("/{session_id}")
async def delete_session(request: Request, session_id: str):
    user_id = await get_user_id(request)

    if not redis_client.sismember(f"user:{user_id}:sessions", session_id):
        raise HTTPException(status_code=404, detail="Session not found")

    clear_session_docs(session_id)
    redis_client.srem(f"user:{user_id}:sessions", session_id)
    redis_client.hdel(f"session:{session_id}:info", session_id)
    redis_client.srem("sessions:active", session_id)
    return ApiResponse.success(message="Session deleted successfully")
