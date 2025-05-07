from typing import Any, Dict, List, TypedDict

from langchain.memory import ConversationBufferMemory
from langchain_core.vectorstores import VectorStoreRetriever


class Session(TypedDict):
    retriever: VectorStoreRetriever
    history: List[Dict[str, Any]]
    memory: ConversationBufferMemory
