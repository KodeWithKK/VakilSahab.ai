from typing import Literal

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: Literal["dev", "prod"]
    FRONTEND_ORIGIN: str
    DATABASE_URL: str
    GEMINI_API_KEY: str
    MISTRAL_API_KEY: str
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str
    REDIS_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
settings = Settings()
