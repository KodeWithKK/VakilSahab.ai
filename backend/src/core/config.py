from typing import Literal

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    FRONTEND_ORIGIN: str
    MISTRAL_API_KEY: str
    GEMINI_API_KEY: str
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str
    ENVIRONMENT: Literal["dev", "prod"]

    class Config:
        env_file = ".env"


settings = Settings()
settings = Settings()
