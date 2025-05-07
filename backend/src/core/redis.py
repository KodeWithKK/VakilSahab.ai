import redis
from langchain_community.chat_message_histories import RedisChatMessageHistory
from src.core.config import settings


def get_session_history(session_id: str):
    return RedisChatMessageHistory(
        session_id=session_id,
        url=settings.REDIS_CONN_STR,
        key_prefix="chat:",
    )


def clear_redis_database():
    r = redis.from_url(settings.REDIS_CONN_STR, decode_responses=True)
    r.flushdb()
