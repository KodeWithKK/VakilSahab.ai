from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core.database import get_db
from src.models.db_tables import User
from src.models.user import UserCreate, UserRead
from src.utils.api_response import ApiResponse

router = APIRouter()


@router.post("/", response_model=ApiResponse[UserRead, dict])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=404, detail="User already exists")

    db_user = User(
        id=user.id,
        email=user.email,
        firstName=user.firstName,
        lastName=user.lastName,
        photo=user.photo,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return ApiResponse.success(data=db_user)


@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: str, user_update: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.email = user_update.email
    db_user.firstName = user_update.firstName
    db_user.lastName = user_update.lastName
    db_user.photo = user_update.photo

    db.commit()
    db.refresh(db_user)
    return ApiResponse.success(data=db_user)


@router.delete("/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()
    return ApiResponse.success(message="User deleted successfully")
