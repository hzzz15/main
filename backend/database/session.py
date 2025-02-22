import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# ✅ 프로젝트 최상위 폴더(mainproj/)로 직접 이동
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))  # mainproj 폴더 지정
ENV_PATH = os.path.join(BASE_DIR, ".env")  # mainproj/.env 파일을 찾도록 수정

if os.path.exists(ENV_PATH):  # ✅ .env 파일이 존재하는지 확인
    load_dotenv(ENV_PATH, override=True)  # ✅ 기존 환경 변수를 덮어쓰도록 변경
    print(f"✅ .env 파일 로드 완료: {ENV_PATH}")
else:
    raise ValueError(f"❌ ERROR: .env 파일을 찾을 수 없습니다! 확인된 경로: {ENV_PATH}")

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("❌ ERROR: 환경 변수 DATABASE_URL이 설정되지 않았습니다. .env 파일 확인 필요!")

# ✅ 비동기 DB 엔진 생성
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# ✅ 비동기 세션 팩토리 생성
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# ✅ FastAPI 주입을 위한 DB 세션 생성 함수
async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()
