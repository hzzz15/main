from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 기존 PostgreSQL 데이터베이스 연결
DATABASE_URL = "postgresql://postgres:1111@172.30.16.66:5432/petcare"

# 데이터베이스 엔진 생성
engine = create_engine(DATABASE_URL)

# 세션 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# DB 세션을 가져오는 함수 (FastAPI 의존성 주입)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
