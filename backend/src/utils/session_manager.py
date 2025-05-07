import shutil

from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_huggingface import HuggingFaceEmbeddings
from src.core.llm import llm
from src.core.ocr import extract_text_from_file
from src.core.pinecone import build_pinecone_index
from src.core.redis import get_session_history
from src.types.session import Session
from src.utils.text_processing import split_chunks

sessions: dict[str, Session] = {}
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


async def process_files_and_build_index(file_paths, session_id):
    all_extracted_text = ""
    for file_path, file_name in file_paths:
        extracted_text = await extract_text_from_file(file_path, file_name, session_id)
        all_extracted_text += extracted_text + "\n"

    chunks = split_chunks(all_extracted_text)
    retriever = build_pinecone_index(chunks, session_id, embedding_model)

    system_prompt = (
        "You are a helpful assistant. "
        "Answer the user's question using the provided context. "
        "Respond in clear, conversational language with well-formatted Markdown. "
        "Avoid phrases like 'Based on the context' or repeating the question."
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

    sessions[session_id] = {
        "retriever": retriever,
        "chain": chain_with_history,
    }

    shutil.rmtree(f"temp/{session_id}", ignore_errors=True)
