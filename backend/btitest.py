from fastapi.testclient import TestClient

from main import app  # FastAPI 앱 불러오기

client = TestClient(app)  # FastAPI 앱 테스트 클라이언트 생성

# 1. 질문 가져오기
response = client.get("/questions")
if response.status_code == 200:
    questions = response.json()
else:
    print("❌ 질문 데이터를 불러오는 데 실패했습니다.")
    exit()

# 2. 사용자 응답 수집
user_answers = {}

print("\n🐶 강아지 MBTI 테스트 시작! 각 질문에 대해 해당하는 번호를 입력하세요.\n")
for category, q_list in questions.items():
    print(f"\n[{category}] 질문입니다.\n")
    for q in q_list:
        print(f"{q['question']}")
        for idx, choice in enumerate(q["choices"], start=1):
            print(f"{idx}. {choice}")
        
        # 사용자 입력 받기
        while True:
            try:
                choice_idx = int(input("👉 선택 (1 또는 2): ").strip())
                if choice_idx in [1, 2]:
                    user_answers[q["id"]] = q["choices"][choice_idx - 1]  # 선택한 보기 저장
                    break
                else:
                    print("1 또는 2를 입력하세요.")
            except ValueError:
                print("숫자로 입력하세요.")

# 3. FastAPI에 데이터 전송
print("\n🚀 결과를 계산 중입니다...\n")
response = client.post("/result/", data=user_answers)

if response.status_code == 200:
    result = response.text  # JSON 대신 단순 문자열로 받음
    print(f"🎉 멍BTI 결과: {result}")  # 바로 문자열로 출력
else:
    print("결과를 가져오는 데 실패했습니다.")
