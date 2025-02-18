from backend.api.gemini_api import get_gemini_score

def generate_prompt(dog_mbti: str, trainer_mbti: str, experience: int) -> str:
    """
    점수 편차를 확대하여 더 다양한 결과가 나오도록 개선된 프롬프트
    """

    return (
        f"A dog with MBTI '{dog_mbti}' and a trainer with MBTI '{trainer_mbti}' with {experience} years of experience.\n\n"
        "### Step-by-step Calculation:\n\n"
        
        "**Step 1: MBTI Compatibility Score (30-70 points)**\n"
        "- If both MBTI types are identical, assign 70 points.\n"
        "- Otherwise, subtract 5 points for each differing letter.\n"
        "- If the result is below 30, set it to 30.\n\n"
        
        "**Step 2: Energy Level Matching Score (-10 to 20 points)**\n"
        "- If the first letter of both MBTI types is the same (Introvert vs. Extrovert match), add 20 points.\n"
        "- If they differ, subtract 10 points.\n\n"
        
        "**Step 3: Trainer Experience Score (0-15 points)**\n"
        "- For each year of experience, add 3 points (max 15 points).\n\n"
        
        "**Final Score Calculation:**\n"
        "Final Score = (Step 1) + (Step 2) + (Step 3)\n"
        "The score must be between 30 and 100.\n\n"
        
        "**Return only the final numeric score as an integer. Do not provide any explanations, text, or symbols.**"
    )

def adjust_ai_score(raw_score: float) -> float:
    """
    AI가 지나치게 낮은 점수를 반환하는 문제 해결
    """

    # ✅ 점수가 30점 미만이면 자동 보정
    if raw_score < 30:
        raw_score = 30 + (raw_score / 3)  # 30 이하의 점수를 보정

    # ✅ 최대값 제한
    final_score = min(raw_score, 70)
    return final_score

def calculate_match_score(dog_mbti: str, trainer_mbti: str, experience: int) -> float:
    """
    개선된 점수 계산 로직:
    1️⃣ 명확한 프롬프트 제공
    2️⃣ AI가 점수를 계산하도록 유도
    3️⃣ AI가 너무 낮은 점수를 반환하면 보정
    """

    prompt = generate_prompt(dog_mbti, trainer_mbti, experience)
    raw_score = get_gemini_score(prompt)
    final_score = adjust_ai_score(raw_score)

    return final_score

if __name__ == "__main__":
    test_cases = [
        ("ENTP", "ENTJ", 2),
        ("ISTJ", "ISFJ", 3),
        ("INFJ", "INFP", 5),
        ("ESTJ", "ENTJ", 4),
        ("ESFP", "ISTJ", 1),
        ("INTP", "ENTP", 6)
    ]
    
    for dog_mbti, trainer_mbti, exp in test_cases:
        score = calculate_match_score(dog_mbti, trainer_mbti, exp)
        print(f"Matching Score ({dog_mbti} & {trainer_mbti}, {exp} years): {score}")
