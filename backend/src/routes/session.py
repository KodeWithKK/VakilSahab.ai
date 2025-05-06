from fastapi import APIRouter, HTTPException
from src.core.pinecone import pinecone_index
from src.utils.session_manager import sessions

router = APIRouter()


@router.get("/list")
async def list_sessions():
    return {"sessions": list(sessions.keys())}


@router.get("/history/{session_id}")
async def get_history(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"history": sessions[session_id]["history"]}


@router.delete("/{session_id}")
async def delete_session(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")

    try:
        pinecone_index.delete(filter={"session_id": session_id})
        del sessions[session_id]
        return {"message": f"Session {session_id} deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting session: {str(e)}")
