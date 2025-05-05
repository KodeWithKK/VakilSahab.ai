from typing import Generic, TypeVar

from pydantic import BaseModel

TData = TypeVar("TData")
TError = TypeVar("TError")


class ApiResponse(BaseModel, Generic[TData, TError]):
    statusCode: int
    data: TData
    error: TError
    message: str
    isSuccess: bool

    @classmethod
    def success(
        cls, data: TData = {}, message: str = "Success", status_code: int = 200
    ):
        return cls(
            statusCode=status_code,
            data=data,
            error={},
            message=message,
            isSuccess=True,
        )

    @classmethod
    def failure(
        cls, error: TError = {}, message: str = "Error", status_code: int = 500
    ):
        return cls(
            statusCode=status_code,
            data={},
            error=error,
            message=message,
            isSuccess=False,
        )
