import redis
from langchain.schema import HumanMessage
from langchain_community.chat_message_histories import RedisChatMessageHistory
from src.core.config import settings

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)


def get_session_history(session_id: str):
    return RedisChatMessageHistory(
        session_id=session_id,
        url=settings.REDIS_URL,
        key_prefix="chat:",
    )


def get_chat_history(session_id: str):
    history = RedisChatMessageHistory(
        session_id=session_id, url=settings.REDIS_URL, key_prefix="chat:"
    )
    return history.messages


def get_all_user_questions(session_id: str):
    redis_chat_history = get_chat_history(session_id)
    user_questions = []

    for msg in redis_chat_history:
        if isinstance(msg, HumanMessage):
            message = msg.content
            message = (
                message.split("User question: ")[-1]
                if "User question: " in message
                else message
            )
        else:
            continue

        user_questions.append(message)

    return user_questions


def clear_redis_database():
    redis_client.flushdb()
    print("Redis database cleared.")
