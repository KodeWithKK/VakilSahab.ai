from pydantic import BaseModel


class QueryRequest(BaseModel):
    session_id: str
    query: str


class QueryResponse(BaseModel):
    session_id: str
    answer: str
