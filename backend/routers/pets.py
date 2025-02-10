from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Pet

router = APIRouter(prefix="/pets", tags=["Pets"])  # 라우터 prefix 추가

@router.get("/pets")
def get_all_pets(db: Session = Depends(get_db)):
    pets = db.query(Pet).all()
    return {
        "pets": [
            {
                "pet_id": pet.id,
                "owner_id": pet.owner_id,
                "mbti": pet.pet_mbti
            }
            for pet in pets
        ]
    }
