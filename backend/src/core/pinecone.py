from langchain.docstore.document import Document
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


def build_pinecone_index(text_chunks, session_id, embedding_model):
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
    return vectorstore.as_retriever(search_kwargs={"k": 3})


def clear_pinecone_index(namespace=""):
    stats = pinecone_index.describe_index_stats()
    if namespace in stats["namespaces"]:
        vector_count = stats["namespaces"][namespace]["vector_count"]
        print(f"Deleting {vector_count} vectors from namespace '{namespace}'.")
        pinecone_index.delete(delete_all=True, namespace=namespace)
    else:
        print(f"Namespace '{namespace}' does not exist. No vectors to delete.")
