import os
import openai
from dotenv import load_dotenv

# ✅ 환경 변수 로드
load_dotenv()
API_KEY = os.getenv("AI_API_KEY")

client = openai.OpenAI(api_key=API_KEY)

def classify_review(text):
    try:
        prompt = f"""
        Analyze the review sentence and classify it into one of the following: 'Shared Situation', 'Cleanness', and 'Interaction'.
Look at the sentence below and return only one correct tag.
        
        - 리뷰 문장: "{text}"
        
        출력 형식:
        - 반드시 '상황공유', '청결도', '교류도' 중 하나의 단어만 출력하세요.
        - 추가적인 설명 없이 단 하나의 단어만 출력해야 합니다.
        
        예시 입력:
        "트레이너님이 친절하고 좋아요."
        
        예시 출력:
        "교류도"
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "system", "content": "너는 리뷰 문장을 태그로 분류하는 AI야."},
                      {"role": "user", "content": prompt}],
            max_tokens=10
        )

        # ✅ OpenAI 응답 로그 출력 (디버깅)
        print(f"📢 OpenAI 원본 응답: {response}")

        # ✅ 최신 OpenAI API 응답 형식으로 변경
        tag = response.choices[0].message.content.strip()

        # ✅ 태그에서 불필요한 따옴표 제거
        tag = tag.strip(" '\"")

        print(f"✅ 정리된 태그 값: {tag}")  # ✅ 최종 태그 확인

        if tag in ["상황공유", "청결도", "교류도"]:
            return tag
        else:
            print(f"❌ 잘못된 태그 응답: {tag}")  # ✅ FastAPI에서 검증 실패하는 원인 찾기
            return None

    except Exception as e:
        print(f"❌ OpenAI API 오류: {str(e)}")
        return None