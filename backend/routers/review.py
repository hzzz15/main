
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from backend.database.connection import get_db
from backend.models.review import Review
from typing import List, Optional, Union, Tuple

router = APIRouter()

@router.get("/reviews/", response_model=Union[List[str], Tuple[List[str], List[float]]])
async def get_reviews(
    tag: Optional[str] = Query(None, description="조회할 태그 선택 (clean, interaction, situation_shared)"),
    db: AsyncSession = Depends(get_db)
):
    # 태그가 없으면 모든 리뷰 가져오기
    if not tag:
        async with db.begin():
            stmt_all_comments = select(Review.comment)
            stmt_all_ratings = select(Review.rating)
            
            result_comments = await db.execute(stmt_all_comments)
            result_ratings = await db.execute(stmt_all_ratings)
        
        comments = result_comments.scalars().all()
        ratings = result_ratings.scalars().all()

        if not comments:
            raise HTTPException(status_code=404, detail="리뷰가 없습니다.")
        
        return (comments, ratings) if ratings else comments

    # 태그가 있는 경우 필터링
    if tag not in ["clean", "interaction", "situation_shared"]:
        raise HTTPException(status_code=400, detail="유효하지 않은 태그입니다.")

    async with db.begin():
        stmt_comment = select(Review.comment).where(getattr(Review, tag) == True)
        stmt_rating = select(Review.rating).where(getattr(Review, tag) == True)

        result_comment = await db.execute(stmt_comment)
        result_rating = await db.execute(stmt_rating)

    comments = result_comment.scalars().all()
    ratings = result_rating.scalars().all()

    if not comments:
        raise HTTPException(status_code=404, detail=f"'{tag}' 태그의 리뷰가 없습니다.")

    return (comments, ratings) if ratings else comments
