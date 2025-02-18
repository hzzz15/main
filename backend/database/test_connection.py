import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print("DATABASE_URL:", DATABASE_URL)

if DATABASE_URL is None:
    print("🚨 DATABASE_URL이 설정되지 않았습니다!")
else:
    print("✅ DATABASE_URL이 정상적으로 설정되었습니다.")
