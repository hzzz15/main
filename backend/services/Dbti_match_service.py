import time
import openai
import random
import os
import re
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.Dbti_match import Pet, Trainer, MatchScore

# 환경 변수 또는 기본값으로 OpenAI API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_openai_recommendation(prompt: str) -> tuple:
    """
    GPT-4 API를 호출하여, 추천 메시지를 생성하는 함수.
    최대 300 토큰 정도의 답변을 생성하며, 추천 점수와 상세 설명이 포함된 단일 텍스트 메시지를 반환함.
    """
    time.sleep(2)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.2
        )
        recommendation = response["choices"][0]["message"]["content"].strip()

        # GPT 응답에서 숫자(0~100 사이)를 추출 (예: "**궁합 점수: 85**")
        match = re.search(r"궁합\s*점수[:：]?\s*(\d{1,3})", recommendation)
        if match:
            gpt_score = int(match.group(1))  # 첫 번째 숫자를 점수로 사용
            recommendation = recommendation.replace(match.group(0), "").strip()
        else:
            gpt_score = 50  # 기본값
            recommendation = recommendation

    except Exception as e:
        print(f"OpenAI Error: {e}")
        gpt_score = 0
        recommendation = "추천 메시지를 생성하는 데 실패했습니다."

    return gpt_score, recommendation

def generate_prompt(pet_mbti: str, trainer_mbti: str, experience: int) -> str:
    """
    강아지와 트레이너의 MBTI(각각에 대한 상세 설명)와 경력 정보를 기반으로,
    GPT가 추천 메시지를 생성할 수 있도록 프롬프트를 구성하는 함수.
    """
    # 강아지 MBTI에 대한 상세 설명
    dog_mbti_descriptions = (
        "| ENTJ (대담한 지휘관형) |\n"
        "리더십이 강하며, 훈련을 잘 받아들이는 강아지\n"
        "보호 본능이 있어 경비견 역할을 잘할 가능성이 큼\n\n"
        "| ENTP (자유로운 혁신가형) |\n"
        "창의적이고 즉흥적인 행동을 보이며, 호기심이 많음\n"
        "새로운 훈련을 빨리 배우지만, 쉽게 질려서 자주 바꿔줘야 함\n\n"
        "| ENFJ (열정적인 지도자형) |\n"
        "주인과의 교감을 중요하게 여기며, 감정이 풍부한 강아지\n"
        "새로운 사람과 강아지에게 친절하며, 리더십이 있음\n\n"
        "| ENFP (에너지 넘치는 탐험가형) |\n"
        "자유롭고 즉흥적인 성향이 강하며, 산책을 가장 좋아함\n"
        "새로운 경험을 좋아하고, 사람들과 어울리는 것을 즐김\n\n"
        "| ISTJ (신뢰할 수 있는 관리자형) |\n"
        "규칙적인 생활을 좋아하고, 안정적인 환경을 선호함\n"
        "보호 본능이 강하고, 충성심이 깊음\n\n"
        "| ISTP (침착한 문제 해결사형) |\n"
        "독립적인 성향이 강하고, 혼자 있는 걸 잘 견딤\n"
        "장난감을 분석하거나, 새로운 도전을 하는 걸 좋아함\n\n"
        "| ISFJ (온화한 수호자형) |\n"
        "가족과 깊은 유대감을 형성하며, 애착이 강함\n"
        "보호 본능이 있으며, 낯선 사람보다는 아는 사람을 선호함\n\n"
        "| ISFP (자유로운 예술가형) |\n"
        "감각이 예민하고, 조용한 환경을 좋아하는 강아지\n"
        "자유로운 산책을 선호하며, 즉흥적인 행동을 자주 보임\n\n"
        "| INTJ (전략적인 사색가형) |\n"
        "계획적인 산책과 훈련을 선호하며, 변화를 싫어함\n"
        "낯가림이 있지만, 신뢰가 쌓이면 깊은 애정을 표현함\n\n"
        "| INTP (논리적인 사색가형) |\n"
        "혼자 탐색하는 걸 좋아하며, 자유로운 환경에서 잘 성장함\n"
        "훈련을 재미있게 풀어줘야 집중력이 유지됨\n\n"
        "| INFJ (사려 깊은 조력자형) |\n"
        "낯선 사람에게는 조심스럽지만, 신뢰가 생기면 애정을 표현함\n"
        "차분한 환경을 좋아하며, 강한 소음이나 변화를 싫어함\n\n"
        "| INFP (꿈 많은 이상가형) |\n"
        "혼자 있는 걸 잘 견디며, 감성이 풍부한 강아지\n"
        "규칙적인 훈련보다는 자유로운 산책을 선호함\n"
    )
    
    # 사람(트레이너) MBTI에 대한 상세 설명
    human_mbti_descriptions = (
        "| ENTJ (대담한 지휘관형) |\n"
        "리더십이 강하며, 조직적인 관리 능력이 뛰어남\n"
        "결정적이고 목표지향적임\n\n"
        "| ENTP (자유로운 혁신가형) |\n"
        "창의적이고 아이디어가 풍부함\n"
        "유연한 사고와 빠른 문제 해결 능력을 가짐\n\n"
        "| ENFJ (열정적인 지도자형) |\n"
        "타인을 배려하며 리더십과 카리스마가 뛰어남\n"
        "감정 소통이 원활하며 사회적 상호작용에 능숙함\n\n"
        "| ENFP (에너지 넘치는 탐험가형) |\n"
        "창의적이고 자유분방한 성향\n"
        "새로운 아이디어와 경험을 즐기며 적극적임\n\n"
        "| ISTJ (신뢰할 수 있는 관리자형) |\n"
        "체계적이고 계획적인 성향\n"
        "신뢰와 책임감이 강하며 안정적임\n\n"
        "| ISTP (침착한 문제 해결사형) |\n"
        "분석적이고 독립적이며, 문제 해결에 뛰어남\n"
        "실용적인 사고방식을 가짐\n\n"
        "| ISFJ (온화한 수호자형) |\n"
        "따뜻하고 배려심이 깊으며, 책임감이 강함\n"
        "전통적이고 조직적임\n\n"
        "| ISFP (자유로운 예술가형) |\n"
        "감각적이고 예술적인 감성이 뛰어남\n"
        "유연하고 창의적이며 감성적임\n\n"
        "| INTJ (전략적인 사색가형) |\n"
        "계획적이고 분석적이며, 장기적인 목표 설정에 능함\n"
        "독립적이고 혁신적인 사고를 가짐\n\n"
        "| INTP (논리적인 사색가형) |\n"
        "논리적이고 분석적인 사고력을 보유\n"
        "창의적 문제 해결 능력이 뛰어남\n\n"
        "| INFJ (사려 깊은 조력자형) |\n"
        "직관적이고 이상주의적이며, 깊은 통찰력을 가짐\n"
        "타인에게 도움을 주려는 경향이 있음\n\n"
        "| INFP (꿈 많은 이상가형) |\n"
        "감성적이고 창의적이며, 이상주의적임\n"
        "내면의 가치와 감정을 중시함\n\n"
        "| ESTJ (단호한 관리자형) |\n"
        "조직적이고 책임감이 강하며, 현실적인 성향이 뚜렷함\n"
        "체계적인 관리 능력을 보유함\n\n"
        "| ESTP (대담한 실행가형) |\n"
        "활동적이고 현실적이며, 모험을 즐김\n"
        "빠른 의사결정 능력을 보유함\n\n"
        "| ESFJ (사교적인 제공자형) |\n"
        "외향적이고 친절하며, 사람들과의 교류를 중시함\n"
        "책임감 있고 협력적임\n\n"
        "| ESFP (즐거운 연예인형) |\n"
        "활기차고 긍정적인 에너지를 가지고 있음\n"
        "즉흥적이며 사교성이 뛰어남\n"
    )
    
    prompt = (
        f"""
    너는 강아지와 트레이너 간 궁합을 분석하는 전문가야.
    아래 정보를 기반으로 **궁합 점수(0~100)와 추천 이유**를 작성해줘.

    [강아지 정보]
     MBTI: {pet_mbti}
     성향: {dog_mbti_descriptions}

    [트레이너 정보]
     MBTI: {trainer_mbti}
     성향: {human_mbti_descriptions}
     경력: {experience}년
    
    [평가 기준]
    1. **MBTI 궁합**: 성향이 얼마나 잘 맞는지 설명해줘.
    2. **산책 스타일 & 에너지 레벨**: 트레이너가 강아지의 에너지를 잘 맞춰줄 수 있는지 분석해줘.
    3. **경력**: 경험이 많은 트레이너가 특정 유형의 강아지에게 어떻게 도움이 될 수 있는지 설명해줘.
    4. **추천 이유**: 트레이너가 강아지에게 적합한 이유를 구체적으로 설명해줘.
    
    [출력 형식]
    궁합 점수: 85/100
    추천 이유:
    이 트레이너는 강아지의 높은 에너지 레벨을 조절할 수 있으며, 
    성격적으로도 안정감을 주어 훈련 효과가 뛰어날 것으로 예상됩니다.
    
    점수를 0~95 사이에서 부여하고, 형식을 유지해줘.
    """
    )
    
    return prompt

async def get_pet_matches(pet_id: int, db: AsyncSession) -> dict:
    """
    특정 반려동물(pet_id)에 대해 **랜덤한 2명의 트레이너**만 선택하여 점수를 계산하고 반환하는 함수.
    """
    # 1. 반려동물 정보 조회
    result = await db.execute(select(Pet).filter(Pet.id == pet_id))
    pet = result.scalars().first()
    if not pet:
        raise Exception("Pet not found")
    pet_mbti = pet.pet_mbti
    if not pet_mbti:
        raise Exception("pet_mbti 정보가 없습니다.")
    
    # 2. 모든 트레이너 조회
    result = await db.execute(select(Trainer))
    trainers = result.scalars().all()
    if not trainers:
        raise Exception("등록된 트레이너가 없습니다.")

    best_matches = []

    for trainer in trainers:
        trainer_mbti = trainer.trainer_mbti
        experience = trainer.experience or 0

        # GPT 추천 메시지 생성
        prompt = generate_prompt(pet_mbti, trainer_mbti, experience)
        total_score, recommendation = get_openai_recommendation(prompt)

        print(f"✅ {trainer.name} (ID: {trainer.id}) - GPT 추천 점수: {total_score}")

        best_matches.append({
            "trainer_id": trainer.id,
            "name": f"{trainer.name} 트레이너" if trainer.name else "이름 없음 트레이너",
            "image_url": trainer.trainer_image_url if trainer.trainer_image_url else "https://default-image-url.com/default.jpg",
            "trainer_mbti": trainer_mbti,
            "experience": experience,
            "mbti_match_score": total_score,       
            "activity_match_score": total_score,  
            "total_match_score": total_score,  
            "recommendation": recommendation
        })

    top_10_matches = sorted(best_matches, key=lambda x: x["total_match_score"], reverse=True)[:10]

    pet_data = {
        "id": pet.id,
        "uuid_id": str(pet.uuid_id),
        "name": pet.name,
        "pet_mbti": pet.pet_mbti
    }
    
    return {"pet": pet_data, "matches": top_10_matches}  