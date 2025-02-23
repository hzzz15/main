import os
import requests
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database.session import get_db

# 환경 변수에서 Supabase 정보 가져오기
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# HTTPBearer를 사용하여 Authorization 헤더에서 토큰 추출
security = HTTPBearer()

router = APIRouter()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UUID:
    """
    Supabase JWT를 검증하고 현재 로그인된 사용자 UUID를 반환합니다.
    """
    token = credentials.credentials
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{SUPABASE_URL}/auth/v1/user", headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT")

    user_data = response.json()
    try:
        # Supabase에서 반환하는 user id를 UUID 형식으로 변환하여 반환합니다.
        return UUID(user_data["id"])
    except Exception as e:
        raise HTTPException(status_code=500, detail="Invalid user id format")

