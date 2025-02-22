import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# ✅ .env 파일 로드
load_dotenv()
DATABASE_URL = os.getenv("SUPABASE_DB_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL이 설정되지 않았습니다. .env 파일을 확인하세요.")

# ✅ SQLAlchemy의 Base 클래스 정의
Base = declarative_base()

# ✅ 비동기 SQLAlchemy 엔진 생성
engine = create_async_engine(DATABASE_URL, echo=True)

# ✅ 비동기 세션 설정
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# ✅ Dependency 함수 (FastAPI에서 주입할 때 사용)
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
