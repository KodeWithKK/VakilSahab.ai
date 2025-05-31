from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_google_genai import ChatGoogleGenerativeAI
from src.core.config import settings
from src.core.redis import get_session_history

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", google_api_key=settings.GEMINI_API_KEY, temperature=0.5
)


def get_llm_chain():
    system_prompt = (
        "You are a highly knowledgeable legal assistant trained in Indian law. Your role is to help users understand legal concepts, laws, and documents clearly and accurately.\n\n"
        "When answering:\n"
        "- Respond in **Markdown** format using bullet points, headings, or bold text to organize your response.\n"
        "- If the uploaded user context contains relevant legal content, use it as your primary reference.\n"
        "- If the uploaded context is missing or irrelevant, confidently use your own knowledge of Indian law to answer the question.\n"
        "- Do **not** say you lack context unless the answer truly depends on a specific uploaded document.\n"
        "- You may respond to general or conversational messages like 'hi', 'hello', or 'thank you' in a warm, friendly, and professional tone.\n"
        "- When summarizing legal content such as contracts or clauses, use plain, non-technical language.\n"
        "- Maintain a respectful, professional, and approachable tone in all responses.\n"
        "- **If you provide any explanation that could be interpreted as legal advice (e.g., interpretation, application, or recommendation), include the following disclaimer at the end in *italics*:**\n"
        "*“This response is for informational purposes only and does not constitute legal advice. Please consult a licensed lawyer for any legal decisions.”*"
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
