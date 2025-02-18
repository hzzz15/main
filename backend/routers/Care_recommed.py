from fastapi import APIRouter, Query
import json
import os
import logging

router = APIRouter()

# ✅ JSON 파일 로드
json_file_path = os.path.abspath("C:/Users/USER/Desktop/whoruGit/mainproj/backend\data/animal_data_updated.json")

if not os.path.exists(json_file_path):
    raise FileNotFoundError(f"JSON 파일을 찾을 수 없습니다: {json_file_path}")

with open(json_file_path, "r", encoding="utf-8") as file:
    dogs_data = json.load(file)

# ✅ 추천 API (id 없이 강아지 정보 전체 반환)
@router.get("/api/recommend_dogs")
def recommend_dogs(tags: str = Query(..., description="사용자가 선택한 태그 목록")):
    user_tags = tags.split(",")  # 사용자가 선택한 태그 리스트
    user_tags = [tag.strip() for tag in user_tags]  # ✅ 공백 제거

    print(f"사용자가 선택한 태그 : {user_tags}")
    logging.info(f"사용자가 선택한 태그 : {user_tags}")
    recommended_dogs = []

    for dog in dogs_data:
        # ✅ 강아지 태그 리스트 정리 (공백 제거)
        dog_tags = [tag.strip() for tag in dog["태그"]]

        # ✅ 태그 일치 개수 계산
        match_count = len(set(user_tags) & set(dog_tags))
        
        if match_count > 0:
            # ✅ 강아지의 전체 정보 반환 (id 없이 JSON 그대로 저장)
            recommended_dogs.append({
                **dog,  # ✅ 강아지 전체 정보 포함
                "match_count": match_count  # ✅ 매칭된 태그 개수 추가
            })

    # ✅ 태그 일치 개수가 많은 순으로 정렬
    recommended_dogs.sort(key=lambda x: x["match_count"], reverse=True)

    return {"recommended_dogs": recommended_dogs}
