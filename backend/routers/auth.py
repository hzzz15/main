from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import jwt
import bcrypt
from datetime import datetime, timedelta
from backend.database.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.model import User
from passlib.context import CryptContext

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120  # 2시간 후 만료

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

# ✅ 회원가입 요청 모델 수정 (누락된 필드 추가)
class SignupRequest(BaseModel):
    user_id: str
    email: str
    password: str
    name: str
    phone_number: str  # 🔥 추가됨
    address: str  # 🔥 추가됨
    nickname: str  # 🔥 추가됨

class LoginRequest(BaseModel):
    user_id: str
    password: str

# ✅ 회원가입 API 수정 (모든 필드 저장)
@router.post("/signup")
async def signup(request: SignupRequest, db_session: AsyncSession = Depends(get_db)):
    # 🔹 중복 아이디 체크
    stmt = select(User).where(User.user_id == request.user_id)
    result = await db_session.execute(stmt)
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")

    # 🔹 비밀번호 해싱
    hashed_password = pwd_context.hash(request.password)

    new_user = User(
        user_id=request.user_id,
        name=request.name,
        email=request.email,
        password=hashed_password,  # 🔹 해싱된 비밀번호 저장
        phone_number=request.phone_number,  # ✅ 저장 추가
        address=request.address,  # ✅ 저장 추가
        nickname=request.nickname,  # ✅ 저장 추가
    )

    db_session.add(new_user)
    await db_session.commit()

    return {"message": "회원가입이 완료되었습니다!"}

# ✅ 로그인 API 수정 (비밀번호 검증 및 JWT 발급)
@router.post("/login")
async def login(request: LoginRequest, db_session: AsyncSession = Depends(get_db)):
    # 🔹 데이터베이스에서 사용자 정보 조회
    stmt = select(User).where(User.user_id == request.user_id)
    result = await db_session.execute(stmt)
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=401, detail="잘못된 아이디 또는 비밀번호입니다.")

    # 🔹 비밀번호 검증
    if not pwd_context.verify(request.password, user.password):
        raise HTTPException(status_code=401, detail="잘못된 아이디 또는 비밀번호입니다.")

    # 🔹 JWT 토큰 생성 (만료 시간 추가)
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {"user_id": user.user_id, "exp": expire}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {"user_id": user.user_id, "token": token}
