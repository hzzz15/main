import asyncio
import time
import openai
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.Dbti_match import Pet, Trainer, MatchScore
from backend.schemas.Dbti_match_schema import MatchResult

# OpenAI API를 사용하여 점수 계산
def get_openai_score(prompt: str) -> float:
    time.sleep(2)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=10,
            temperature=0.2
        )
        response_text = response["choices"][0]["message"]["content"].strip()
        score = float(response_text) if response_text.isdigit() else 0.0
    except Exception as e:
        print(f"OpenAI Error: {e}")
        score = 0.0
    return score

# GPT가 이해하기 쉬운 점수 계산 기준을 제공하는 프롬프트 생성
def generate_prompt(pet_mbti: str, trainer_mbti: str, experience: int) -> str:
    return (
        f"A pet with MBTI '{pet_mbti}' is being matched with a trainer with MBTI '{trainer_mbti}'. "
        f"The trainer has {experience} years of experience.\n\n"

        "### **Step-by-step Scoring Criteria:**\n\n"

        "**Step 1: MBTI Compatibility Score (30 - 70 points)**\n"
        "- If MBTI types are **exactly the same**, assign **70 points**.\n"
        "- Otherwise, **subtract 5 points** for each differing MBTI letter.\n"
        "- The minimum score for this step is **30 points**.\n\n"

        "**Step 2: Energy Level Match Score (-10 to 20 points)**\n"
        "- If the **first letter** of MBTI matches (E/E or I/I), add **20 points**.\n"
        "- Otherwise, subtract **10 points**.\n\n"

        "**Step 3: Trainer Experience Score (0 - 15 points)**\n"
        "- Assign **3 points per year** of experience (capped at **15 points**).\n\n"

        "**Final Score Calculation:**\n"
        "Final Score = (Step 1) + (Step 2) + (Step 3)\n\n"
        "- Ensure the final score is between **30 and 95**.\n"
        "- If the calculated score is **less than 30**, set it to **30**.\n"
        "- If the calculated score is **greater than 95**, set it to **95**.\n\n"

        "**Return Format:**\n"
        "**Return ONLY the final score as a single integer, nothing else.**"
    )

# OpenAI를 활용한 점수 계산
def calculate_match_score(pet_mbti: str, trainer_mbti: str, experience: int) -> float:
    prompt = generate_prompt(pet_mbti, trainer_mbti, experience)
    score = get_openai_score(prompt)
    if score < 30 or score > 95:
        score = calculate_manual_score(pet_mbti, trainer_mbti, experience)
    return score

# 수동 점수 계산 (백업용)
def calculate_manual_score(pet_mbti: str, trainer_mbti: str, experience: int) -> float:
    mbti_score = 70
    for i in range(4):
        if pet_mbti[i] != trainer_mbti[i]:
            mbti_score -= 5
    mbti_score = max(mbti_score, 30)

    energy_score = 20 if pet_mbti[0] == trainer_mbti[0] else -10
    experience_score = min(experience * 3, 15)

    final_score = mbti_score + energy_score + experience_score
    return max(30, min(final_score, 95))  # 최대 점수 95 제한

async def get_pet_matches(pet_id: int, db: AsyncSession) -> dict:
    # 1. pet 정보 조회
    result = await db.execute(select(Pet).filter(Pet.id == pet_id))
    pet = result.scalars().first()
    if not pet:
        raise Exception("Pet not found")
    pet_mbti = pet.pet_mbti
    if not pet_mbti:
        raise Exception("pet_mbti 정보가 없습니다.")

    # 2. trainers 정보 조회
    result = await db.execute(select(Trainer))
    trainers = result.scalars().all()
    if not trainers:
        raise Exception("Trainers not found")

    matches = []
    mbti_count = {}  # MBTI별 추천된 개수 카운트

    # 3. 각 트레이너에 대해 매칭 점수 계산
    for trainer in trainers:
        trainer_mbti = trainer.trainer_mbti
        experience = trainer.experience or 0

        # MBTI별 3명 제한
        if mbti_count.get(trainer_mbti, 0) >= 3:
            continue

        # 매칭 점수 계산
        mbti_match_score = calculate_match_score(pet_mbti, trainer_mbti, experience)
        activity_match_score = 0  # 필요 시 적용
        total_match_score = mbti_match_score + activity_match_score

        # 최대 점수 95로 제한
        total_match_score = min(total_match_score, 95)

        # MBTI 카운트 업데이트
        mbti_count[trainer_mbti] = mbti_count.get(trainer_mbti, 0) + 1

        # 4. match_scores 테이블에 저장
        new_match = MatchScore(
            pet_id=pet_id,
            trainer_id=trainer.id,
            mbti_match_score=mbti_match_score,
            activity_match_score=activity_match_score,
            total_match_score=total_match_score
        )
        db.add(new_match)
        await db.commit()

        # 여기서 각 매칭 결과에 추가 필드(name, image_url)도 포함합니다.
        matches.append({
            "trainer_id": trainer.id,
            "name": trainer.name,  # users 테이블에서 가져온 이름 혹은 Trainer 모델의 name
            "image_url": trainer.trainer_image_url,  # Trainer 테이블에 저장된 이미지 URL
            "trainer_mbti": trainer_mbti,
            "experience": experience,
            "mbti_match_score": mbti_match_score,
            "activity_match_score": activity_match_score,
            "total_match_score": total_match_score
        })

    # 5. 정렬 기준 적용
    matches.sort(
        key=lambda x: (-x["total_match_score"], -x["mbti_match_score"], -x["experience"])
    )

    return {"pet": {"id": pet.id, "pet_mbti": pet.pet_mbti}, "matches": matches}
