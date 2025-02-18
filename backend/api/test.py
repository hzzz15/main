import os
import openai
from dotenv import load_dotenv

# 🔹 .env 파일 로드
load_dotenv()

# 🔹 환경 변수에서 API 키 가져오기
api_key = os.getenv("OPENAI_API_KEY")

# 🔹 강제로 환경 변수에 API 키 저장 (이 방식으로 해결될 가능성이 큼)
os.environ["OPENAI_API_KEY"] = api_key

# 🔹 OpenAI API 키 설정
openai.api_key = os.environ["OPENAI_API_KEY"]

# 🔹 테스트 요청
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "안녕하세요!"}]
)

print(response["choices"][0]["message"]["content"])
