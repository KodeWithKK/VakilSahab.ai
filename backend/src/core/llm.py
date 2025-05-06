from langchain_google_genai import ChatGoogleGenerativeAI
from src.core.config import settings

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", google_api_key=settings.GEMINI_API_KEY, temperature=0.2
)


async def generate_answer(prompt: str) -> str:
    try:
        result = await llm.apredict(prompt)
        return result
    except Exception as e:
        raise RuntimeError(f"LLM generation error: {str(e)}")
