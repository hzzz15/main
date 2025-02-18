import json
import os

# JSON 파일 경로 (수정 필요)
json_file_path = "public/data/animal_data_updated.json"

# JSON 파일이 존재하는지 확인
if not os.path.exists(json_file_path):
    print(f"❌ 파일을 찾을 수 없습니다: {json_file_path}")
else:
    # JSON 파일 로드
    with open(json_file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    # "태그" 필드를 리스트로 변환하는 함수
    def convert_tags_to_list(dog):
        if isinstance(dog.get("태그"), str):  # "태그" 값이 문자열이면 변환
            tags_list = [tag.strip().replace("#", "") for tag in dog["태그"].split(";") if tag.strip()]
            dog["태그"] = tags_list  # 변환된 리스트를 다시 저장
        return dog

    # 모든 강아지 데이터에 적용 (리스트 또는 딕셔너리 확인)
    if isinstance(data, list):  
        data = [convert_tags_to_list(dog) for dog in data]  # 리스트라면 각 항목 변환
    elif isinstance(data, dict):  
        for key, value in data.items():
            if isinstance(value, list):  # 리스트 타입의 값이 있으면 변환 실행
                data[key] = [convert_tags_to_list(dog) for dog in value]

    # 변환된 데이터를 JSON 파일에 덮어쓰기
    with open(json_file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print(f"✅ 태그 변환 완료! {json_file_path} 파일이 업데이트되었습니다.")
