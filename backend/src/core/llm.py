from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_google_genai import ChatGoogleGenerativeAI
from src.core.config import settings
from src.core.redis import get_session_history

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", google_api_key=settings.GEMINI_API_KEY, temperature=0.7
)


def get_llm_chain():
    system_prompt = (
        "You are a highly knowledgeable legal assistant trained in Indian law. Your goal is to help users understand legal topics clearly, based only on the provided context.\n\n"
        "When answering:\n"
        "- Respond in **Markdown** format.\n"
        "- Use bullet points, headings, or bold text where helpful for clarity.\n"
        "- **Do not** use phrases like “Based on the information provided,” “According to the context,” or similar. Just answer directly and confidently using the context.\n"
        "- Quote or cite relevant **sections of Indian laws, Acts, or case laws** if available in the context.\n"
        "- Do **not** fabricate laws or legal interpretations."
        "- Keep answers **precise, practical**, and in **simple, non-technical language**.\n"
        "- Do **not** repeat the user's question.\n"
        "- Maintain a **friendly but professional** tone.\n\n"
        "If you cannot find an answer in the context, clearly state that and suggest speaking to a lawyer.\n\n"
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
