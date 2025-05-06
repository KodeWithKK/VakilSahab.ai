from langchain.docstore.document import Document
from pinecone import Pinecone, ServerlessSpec
from src.core.config import settings

pc = Pinecone(api_key=settings.PINECONE_API_KEY)
index_name = settings.PINECONE_INDEX_NAME

existing_indexes = pc.list_indexes().names()
if index_name not in existing_indexes:
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

pinecone_index = pc.Index(index_name)


class PineconeRetriever:
    def __init__(self, pinecone_index, embedding_model, k=3):
        self.pinecone_index = pinecone_index
        self.embedding_model = embedding_model
        self.k = k

    def get_relevant_documents(self, query):
        query_embedding = self.embedding_model.embed_query(query)
        results = self.pinecone_index.query(
            vector=query_embedding, top_k=self.k, include_metadata=True
        )
        return [
            Document(page_content=match["metadata"]["text"], metadata=match["metadata"])
            for match in results["matches"]
        ]


def build_pinecone_index(text_chunks, session_id, embedding_model):
    documents = [Document(page_content=chunk) for chunk in text_chunks]
    embeddings = embedding_model.embed_documents(
        [doc.page_content for doc in documents]
    )
    vectors = [
        {
            "id": f"{session_id}_doc_{i}",
            "values": embedding,
            "metadata": {"text": doc.page_content, "session_id": session_id},
        }
        for i, (embedding, doc) in enumerate(zip(embeddings, documents))
    ]
    pinecone_index.upsert(vectors=vectors)
    return PineconeRetriever(pinecone_index, embedding_model, k=3)
