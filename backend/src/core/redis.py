import redis
from langchain_community.chat_message_histories import RedisChatMessageHistory
from src.core.config import settings

redis_client = redis.from_url(settings.REDIS_CONN_STR, decode_responses=True)


def get_session_history(session_id: str):
    return RedisChatMessageHistory(
        session_id=session_id,
        url=settings.REDIS_CONN_STR,
        key_prefix="chat:",
    )


def get_chat_history(session_id: str):
    history = RedisChatMessageHistory(
        session_id=session_id, url=settings.REDIS_CONN_STR, key_prefix="chat:"
    )
    return history.messages


def clear_redis_database():
    redis_client.flushdb()
    redis_client.sadd("active_sessions", "MAIN")
    print("Redis database cleared.")
