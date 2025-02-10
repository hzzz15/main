from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from database.crud import get_pet_by_id
from services.bti_match_service import recommend_trainers
from schemas.bti_match_schema import TrainerRecommendation

router = APIRouter()

@router.get("/recommend/{pet_id}", response_model=TrainerRecommendation)
def get_trainer_recommendations(pet_id: int, db: Session = Depends(get_db)):
    pet = get_pet_by_id(db, pet_id)
    if not pet:
        return {"error": "해당 강아지를 찾을 수 없습니다."}

    recommended_trainers = recommend_trainers(db, pet)
    return {"recommended_trainers": recommended_trainers}
