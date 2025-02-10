import xgboost as xgb
import numpy as np
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import join
from database.models import Trainer, User
from utils.bti_data import get_mbti_match_score, calculate_activity_match

# ✅ XGBoost 모델 로드
model = xgb.Booster()
model.load_model("ml/xgboost_mbti.json")

# ✅ 학습 데이터에서 사용한 컬럼 로드
df_train = pd.read_csv("C:/Users/USER/Desktop/main/backend/data/mbti_matching_data_large.csv")
df_train = pd.get_dummies(df_train, columns=["pet_mbti", "trainer_mbti"])
train_columns = df_train.drop(columns=["total_score"]).columns.tolist()

def recommend_trainers(db: Session, pet):
    # ✅ `JOIN`을 사용하여 `User.name` 가져오기
    trainers = db.query(Trainer, User.name).join(User, Trainer.user_id == User.id).all()

    recommendations = []
    mbti_seen = set()  # ✅ 중복 방지를 위한 MBTI 저장 set

    for trainer, trainer_name in trainers:
        if trainer.trainer_mbti in mbti_seen:
            continue  # ✅ 같은 MBTI의 트레이너가 이미 추가되었으면 넘어감
        mbti_seen.add(trainer.trainer_mbti)  # ✅ MBTI 추가

        # 1️⃣ MBTI 궁합도 및 활동량 점수 계산
        mbti_score = get_mbti_match_score(pet.pet_mbti, trainer.trainer_mbti)
        activity_match = calculate_activity_match(pet.pet_mbti, trainer.trainer_mbti)

        # ✅ experience와 rating의 None 값 방지
        experience_value = int(trainer.experience) if trainer.experience is not None else 0
        rating_value = float(trainer.rating) if trainer.rating is not None else 0.0

        # 2️⃣ 입력 데이터 생성 (원-핫 인코딩 전)
        input_data = {
            "mbti_score": [mbti_score],
            "activity_match": [activity_match],
            "experience": [experience_value]
        }

        # 3️⃣ pet_mbti 및 trainer_mbti 원-핫 인코딩 적용
        for col in train_columns:
            if col.startswith("pet_mbti_"):
                input_data[col] = [1 if col == f"pet_mbti_{pet.pet_mbti}" else 0]
            elif col.startswith("trainer_mbti_"):
                input_data[col] = [1 if col == f"trainer_mbti_{trainer.trainer_mbti}" else 0]

        # 4️⃣ DataFrame 변환 후 컬럼 순서 맞추기
        input_df = pd.DataFrame(input_data)
        input_df = input_df.reindex(columns=train_columns, fill_value=0)

        # ✅ DataFrame에서도 experience를 int로 변환
        input_df["experience"] = input_df["experience"].astype(int)

        # 5️⃣ XGBoost 예측 실행
        dmatrix = xgb.DMatrix(input_df)
        score = model.predict(dmatrix)[0]

        # ✅ FastAPI 응답 모델과 일치하도록 필드 추가
        recommendations.append({
            "id": trainer.id,
            "name": trainer_name,  # ✅ users 테이블에서 가져온 name
            "trainer_mbti": trainer.trainer_mbti,
            "experience": experience_value,
            "rating": rating_value,
            "score": score
        })

    # 6️⃣ 상위 4명의 트레이너 추천 (MBTI가 중복되지 않도록 필터링됨)
    recommendations = sorted(recommendations, key=lambda x: x["score"], reverse=True)[:4]
    return recommendations
