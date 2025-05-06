from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    id: str
    email: str
    firstName: str
    lastName: str
    photo: str


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    createdAt: datetime
    updatedAt: datetime

    model_config = {"from_attributes": True}
