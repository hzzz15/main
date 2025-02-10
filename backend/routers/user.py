from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import User

router = APIRouter()

@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return {
        "users": [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "password": user.password,
                "nickname": user.nickname,
                "phone_number": user.phone_number,
                "address": user.address,
                "is_walker": user.is_walker
            }
            for user in users
        ]
    }
