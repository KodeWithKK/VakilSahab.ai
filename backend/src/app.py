from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.database import Base, engine
from src.routes import user
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

# Register custom handlers
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)


@app.get("/", tags=["Welcome"])
def welcome():
    return {"message": "Welcome to VakilSahab.ai!"}
