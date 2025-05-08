from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_google_genai import ChatGoogleGenerativeAI
from src.core.config import settings
from src.core.redis import get_session_history

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", google_api_key=settings.GEMINI_API_KEY, temperature=0.2
)


def get_llm_chain():
    system_prompt = (
        "You are a helpful assistant. "
        "Answer the user's question clearly and directly based on the provided context. "
        "Use natural, conversational language. "
        "Avoid legal jargon or technical terms unless necessary. "
        "Do not say phrases like 'Based on the context' or 'The context mentions.' "
        "Do not repeat the question. "
        "Keep your answers simple, practical, and friendly."
    )

    chat_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="history"),
            ("user", "{input}"),
        ]
    )

    llm_chain = chat_prompt | llm

    chain_with_history = RunnableWithMessageHistory(
        llm_chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )

    return chain_with_history
