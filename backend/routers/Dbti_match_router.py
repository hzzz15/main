from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database.session import get_db
from backend.services.Dbti_match_service import get_pet_matches
from backend.schemas.Dbti_match_schema import PetMatchResponse

router = APIRouter(prefix="/match", tags=["Match"])

@router.get("/pet/{pet_id}/matches", response_model=PetMatchResponse)
async def match_pet_with_trainers(pet_id: int, db: AsyncSession = Depends(get_db)):
    """
    특정 반려동물(pet_id)에 대해 트레이너를 추천받는 엔드포인트.
    """
    try:
        result = await get_pet_matches(pet_id, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
