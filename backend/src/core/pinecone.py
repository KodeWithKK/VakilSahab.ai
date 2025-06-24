from typing import List

from langchain.docstore.document import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
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
        dimension=768,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

pinecone_index = pc.Index(index_name)

# Initialize embedding model
embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001", google_api_key=settings.GEMINI_API_KEY
)


def build_pinecone_session(
    text_chunks: List[str], session_id: str, batch_size: int = 100
):
    documents = [
        Document(page_content=chunk, metadata={"session_id": session_id, "text": chunk})
        for chunk in text_chunks
    ]

    print(f"Adding {len(documents)} documents to Pinecone index...")

    # Connect to existing Pinecone index
    vectorstore = PineconeVectorStore(
        index=pinecone_index,
        embedding=embedding_model,
        text_key="text",  # raw text key
    )

    for i in range(0, len(documents), batch_size):
        batch = documents[i : i + batch_size]
        print(f"Upserting batch #{i // batch_size + 1} ({len(batch)} docs)...")
        vectorstore.add_documents(batch)


def load_pinecone_retriever(session_id: str, top_k: int = 4):
    vectorstore = PineconeVectorStore(
        index=pinecone_index, embedding=embedding_model, text_key="text"
    )
    retriever = vectorstore.as_retriever(
        search_kwargs={"k": top_k, "filter": {"session_id": session_id}}
    )
    return retriever


def clear_session_docs(session_id: str):
    metadata_filter = {"session_id": session_id}
    pinecone_index.delete(filter=metadata_filter)


def clear_pinecone_index(namespace: str = ""):
    stats = pinecone_index.describe_index_stats()
    if namespace in stats["namespaces"]:
        metadata_filter = {"session_id": {"$ne": "MAIN"}}
        pinecone_index.delete(namespace=namespace, filter=metadata_filter)
        print(f"Deleted all none main vectors from namespace '{namespace}'.")
    else:
        print(f"Namespace '{namespace}' does not exist. No vectors to delete.")
