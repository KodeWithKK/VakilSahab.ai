from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from src.utils.api_response import ApiResponse
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR


async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ApiResponse.failure(
            error={"detail": exc.detail},
            message=exc.detail
            if isinstance(exc.detail, str)
            else "Something went wrong",
            status_code=exc.status_code,
        ).__dict__,
    )


async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        content=ApiResponse.failure(
            error={"detail": str(exc)},
            message="Internal Server Error",
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        ).__dict__,
    )
