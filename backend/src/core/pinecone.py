from typing import List

from langchain.docstore.document import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from src.core.config import settings

# Initialize Pinecone client
pc = Pinecone(api_key=settings.PINECONE_API_KEY)
index_name = settings.PINECONE_INDEX_NAME

# Create index if it doesn’t exist
existing_indexes = pc.list_indexes().names()
if index_name not in existing_indexes:
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

pinecone_index = pc.Index(index_name)

# Initialize embedding model
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


def build_pinecone_session(text_chunks: List[str], session_id: str):
    documents = [
        Document(page_content=chunk, metadata={"session_id": session_id, "text": chunk})
        for chunk in text_chunks
    ]

    # Connect to existing Pinecone index
    vectorstore = PineconeVectorStore(
        index=pinecone_index,
        embedding=embedding_model,
        text_key="text",  # raw text key
    )

    vectorstore.add_documents(documents)


def load_pinecone_retriever(session_id: str, top_k: int = 3):
    vectorstore = PineconeVectorStore(
        index=pinecone_index, embedding=embedding_model, text_key="text"
    )
    retriever = vectorstore.as_retriever(
        search_kwargs={"k": top_k, "filter": {"session_id": session_id}}
    )
    return retriever


def clear_pinecone_index(namespace: str = ""):
    stats = pinecone_index.describe_index_stats()
    if namespace in stats["namespaces"]:
        metadata_filter = {"session_id": {"$ne": "MAIN"}}
        pinecone_index.delete(namespace=namespace, filter=metadata_filter)
        print(f"Deleted all none main vectors from namespace '{namespace}'.")
    else:
        print(f"Namespace '{namespace}' does not exist. No vectors to delete.")
