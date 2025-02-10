from sqlalchemy.orm import Session
from .models import Pet, Trainer, MatchScore

def get_pet_by_id(db: Session, pet_id: int):
    return db.query(Pet).filter(Pet.id == pet_id).first()

def get_all_trainers(db: Session):
    return db.query(Trainer).filter(Trainer.is_verified == True).all()

def get_match_score(db: Session, pet_id: int, trainer_id: int):
    return db.query(MatchScore).filter(
        MatchScore.pet_id == pet_id,
        MatchScore.trainer_id == trainer_id
    ).first()
