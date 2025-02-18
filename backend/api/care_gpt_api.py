import openai
import os
import json
from dotenv import load_dotenv

# 🔹 .env 파일 로드
load_dotenv()

# 🔹 환경 변수에서 API 키 가져오기
openai.api_key = os.getenv("OPENAI_API_KEY")

# 🔹 미리 설정한 태그 목록 (이 목록에서만 추가 가능)
predefined_tags = [
    "실내생활OK", "단독생활OK", "혼자있는시간많음", 
    "분리불안없음", "마당있음", "아파트OK", "반려동물동반가능", 
    "경계심있음", "강아지친화력굿", "훈련잘됨"
]

# 🔹 파일 경로 설정
input_file = "public/data/animal_data.json"
output_file = "public/data/animal_data_updated.json"

# 🔹 JSON 파일 로드
with open(input_file, "r", encoding="utf-8") as file:
    dog_data = json.load(file)

# 🔹 GPT-4 API를 사용하여 태그 업데이트 (최대 3개 추가)
def generate_tags(text, tags):
    prompt = f"""
    아래는 강아지의 성격을 설명하는 문장입니다:

    "{text}"

    주어진 태그 목록에서 해당 강아지와 가장 적절한 태그 **최대 3개**만 골라 쉼표(,)로 구분하여 출력해 주세요.
    태그 목록:
    {", ".join(tags)}

    응답 형식:
    태그: [선택된 태그 1, 선택된 태그 2, 선택된 태그 3] (이유 없이 태그만 반환)
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "너는 강아지의 성격을 분석하여 적절한 태그만 반환하는 도우미야."},
            {"role": "user", "content": prompt}
        ]
    )

    # 태그 부분만 추출
    new_tags = response["choices"][0]["message"]["content"].strip().replace("태그:", "").strip()
    return new_tags

# 🔹 JSON 데이터 업데이트
for dog in dog_data:
    if "성격 및 특징" in dog:  # "성격 및 특징" 필드가 있는 경우만 처리
        new_tags = generate_tags(dog["성격 및 특징"], predefined_tags)
        
        # 기존 태그 가져오기 (없으면 빈 리스트)
        existing_tags = dog.get("태그", "").replace("# ", "").split("; ") if dog.get("태그") else []
        
        # 새로운 태그 리스트
        new_tags_list = new_tags.split(", ")

        # 기존 태그 + 새로운 태그 (최대 3개) 추가 후 중복 제거
        combined_tags = list(set(existing_tags + new_tags_list))  # 중복 제거
        final_tags = existing_tags + [tag for tag in new_tags_list if tag in predefined_tags and tag not in existing_tags][:3]

        # 업데이트된 태그 저장
        dog["태그"] = "; ".join(f"# {tag}" for tag in final_tags)

# 🔹 업데이트된 JSON 저장
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(dog_data, file, indent=4, ensure_ascii=False)

print(f"✅ 모든 강아지 데이터 업데이트 완료! ('{output_file}' 파일 확인)")
