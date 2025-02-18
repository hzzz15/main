import os
import time
import requests
import re
from dotenv import load_dotenv

# ✅ .env 파일 로드
load_dotenv()

# ✅ Google Gemini API 키 가져오기
API_KEY = os.getenv("GEMINI_API_KEY")

# ✅ Google Gemini API 기본 URL 설정
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"


def get_gemini_score(prompt: str) -> float:
    """Google Gemini API를 사용하여 점수를 예측"""

    # ✅ 요청 속도 조절 (Rate Limit 방지)
    time.sleep(2)

    # ✅ HTTP 요청 데이터 구성
    headers = {"Content-Type": "application/json"}
    params = {"key": API_KEY}
    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": 10}
    }

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=data)

        if response.status_code == 200:
            response_json = response.json()
            print("📌 Gemini API 응답 데이터:", response_json)  # ✅ 응답 내용 출력
            score_text = response_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "0").strip()
        else:
            print(f"Error: {response.status_code} - {response.text}")
            score_text = "0"

        # ✅ 정규식을 사용하여 숫자만 추출
        score_numbers = re.findall(r'\d+\.?\d*', score_text)
        score = float(score_numbers[0]) if score_numbers else 0.0

        print("📌 최종 변환된 매칭 스코어:", score)
    except ValueError:
        score = 0.0  # 예측 실패 시 기본값 0 반환
    except Exception as e:
        print(f"Error: {e}")  # 오류 메시지 출력
        score = 0.0

    return score
