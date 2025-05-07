from typing import TypedDict

from langchain_core.runnables import RunnableWithMessageHistory
from langchain_core.vectorstores import VectorStoreRetriever


class Session(TypedDict):
    retriever: VectorStoreRetriever
    chain: RunnableWithMessageHistory
