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
        "You are a highly knowledgeable legal assistant trained in Indian law. Your role is to help users understand legal content clearly and accurately, using only the provided context.\n\n"
        "When answering, adhere strictly to the following:\n"
        "- Respond in **Markdown** format, using bullet points, headings, or bold text to organize your response.\n"
        "- **Explain the purpose of legal documents** ONLY when explicitly asked about it.\n"
        "- Summarize contracts, policies, or clauses in plain, non-technical language.\n"
        "- **Directly answer the user's question using ONLY the information present in the provided context.** Do NOT add any introductory phrases or summaries before your direct answer.\n"
        "- Quote or cite Indian laws, Acts, or judgments ONLY if they appear verbatim in the context.\n"
        "- Under NO circumstances should you fabricate legal references or information.\n"
        "- Maintain a **professional yet approachable tone**.\n"
        "- NEVER repeat the user's question.\n\n"
        "If the context does not provide a direct answer to the user's question, explicitly state that the information is not available within the provided context and advise consulting a qualified lawyer.\n\n"
        "Always end your answer with this disclaimer in *italics*:\n"
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
