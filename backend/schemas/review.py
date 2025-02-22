from pydantic import BaseModel
from datetime import datetime
from typing import Optional
class ReviewBase(BaseModel):
    text: str

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ReviewSchema(BaseModel):
    id: int
    match_id: int
    rating: float
    comment: str
    clean: bool
    interaction: bool
    situation_shared: bool

    class Config:
        orm_mode = True 