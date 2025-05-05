from sqlalchemy import Column, DateTime, String, Text
from sqlalchemy.sql import func

from src.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Text, primary_key=True)
    email = Column(Text, nullable=False)
    firstName = Column(Text, nullable=False)
    lastName = Column(Text, nullable=False)
    photo = Column(Text, nullable=False)
    createdAt = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updatedAt = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    role = Column(String, default="USER", nullable=False)
