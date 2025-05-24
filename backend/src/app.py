import shutil

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.core.database import Base, engine
from src.core.pinecone import clear_pinecone_index
from src.routes import main_context, query, session, user
from src.utils.exception_handler import (
    generic_exception_handler,
    http_exception_handler,
)

app = FastAPI(title="VakilSahab.ai")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(user.router, tags=["User"], prefix="/api/user")
app.include_router(main_context.router, tags=["Main Context"], prefix="/api/main")
app.include_router(session.router, tags=["Session"], prefix="/api/session")
app.include_router(query.router, tags=["Query"], prefix="/api/query")

# Register custom handlers
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)


@app.get("/", tags=["Welcome"])
def welcome():
    return {"message": "Welcome to VakilSahab.ai!"}


@app.on_event("shutdown")
def shutdown_event():
    if settings.ENVIRONMENT == "dev":
        clear_pinecone_index()
        # clear_redis_database()

    shutil.rmtree("./temp", ignore_errors=True)
