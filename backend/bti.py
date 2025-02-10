from fastapi import APIRouter, Form
from typing import Dict

router = APIRouter()

# 질문 데이터 (선택지만 표시)
questions = {
    "E/I": [
        {"id": "ei1", "question": "강아지가 산책 나가자고 하면?", "choices": ["줄을 당기면서 빨리 나가고 싶어함.", "주인이 준비할 때까지 조용히 기다림."]},
        {"id": "ei2", "question": "다른 강아지를 만나면?", "choices": ["바로 달려가서 인사함.", "조심스럽게 접근하거나 관심이 없음."]},
        {"id": "ei3", "question": "새로운 장소에 가면?", "choices": ["신나서 이곳저곳 뛰어다님.", "처음엔 조심스럽고 경계함."]}
    ],
    "S/N": [
        {"id": "sn1", "question": "주인이 집에 없을 때?", "choices": ["불안해하며 짖거나 문 앞에서 기다림.", "혼자서도 잘 놀거나 별 신경 안 씀."]},
        {"id": "sn2", "question": "가족이나 친구가 집에 오면?", "choices": ["격하게 반기고 애정 표현을 많이 함.", "처음엔 거리를 두고 지켜봄."]},
        {"id": "sn3", "question": "다른 강아지들과 함께 산책하면?", "choices": ["같이 뛰어놀고 신나함.", "혼자 조용히 걷거나 따로 다님."]}
    ],
    "T/F": [
        {"id": "tf1", "question": "훈련할 때(앉아, 기다려 등)?", "choices": ["쉽게 따라하고 집중력이 높음.", "금방 흥미를 잃고 다른 곳에 관심 가짐."]},
        {"id": "tf2", "question": "간식을 줄 때?", "choices": ["훈련을 해야만 간식을 받는 걸 이해함.", "주인이 주기만을 기대하며 기다림."]},
        {"id": "tf3", "question": "산책 중 명령을 내리면?", "choices": ["바로 반응하며 따른다.", "기분에 따라 반응이 다름."]}
    ],
    "J/P": [
        {"id": "jp1", "question": "산책 시간이나 식사 시간이 일정하지 않으면?", "choices": ["평소와 다르면 불안해하거나 낑낑거림.", "달라져도 크게 신경 쓰지 않음."]},
        {"id": "jp2", "question": "집 안에서 행동 패턴은?", "choices": ["정해진 자리에서 쉬고, 일정한 루틴을 따름.", "여기저기 돌아다니며 자유롭게 놈."]},
        {"id": "jp3", "question": "새로운 장난감을 주면?", "choices": ["천천히 익숙해지고 기존의 장난감을 더 좋아함.", "새로운 것에 바로 관심을 보이며 흥분함."]}
    ]
}

#1. 질문 데이터 제공 API
@router.get("/questions", response_model=Dict[str, list])
async def get_questions():
    return questions  # JSON 형태로 React에 반환

#2. 결과 계산 API (선택지 값을 변환하여 저장)
@router.post("/result/")
async def calculate_result(
    ei1: str = Form(...), ei2: str = Form(...), ei3: str = Form(...),
    sn1: str = Form(...), sn2: str = Form(...), sn3: str = Form(...),
    tf1: str = Form(...), tf2: str = Form(...), tf3: str = Form(...),
    jp1: str = Form(...), jp2: str = Form(...), jp3: str = Form(...)
):
    # 1. 사용자가 선택한 데이터를 MBTI 코드로 변환
    mapping = {
        "E/I": {
            questions["E/I"][0]["choices"][0]: "E", questions["E/I"][0]["choices"][1]: "I",
            questions["E/I"][1]["choices"][0]: "E", questions["E/I"][1]["choices"][1]: "I",
            questions["E/I"][2]["choices"][0]: "E", questions["E/I"][2]["choices"][1]: "I"
        },
        "S/N": {
            questions["S/N"][0]["choices"][0]: "S", questions["S/N"][0]["choices"][1]: "N",
            questions["S/N"][1]["choices"][0]: "S", questions["S/N"][1]["choices"][1]: "N",
            questions["S/N"][2]["choices"][0]: "S", questions["S/N"][2]["choices"][1]: "N"
        },
        "T/F": {
            questions["T/F"][0]["choices"][0]: "T", questions["T/F"][0]["choices"][1]: "F",
            questions["T/F"][1]["choices"][0]: "T", questions["T/F"][1]["choices"][1]: "F",
            questions["T/F"][2]["choices"][0]: "T", questions["T/F"][2]["choices"][1]: "F"
        },
        "J/P": {
            questions["J/P"][0]["choices"][0]: "J", questions["J/P"][0]["choices"][1]: "P",
            questions["J/P"][1]["choices"][0]: "J", questions["J/P"][1]["choices"][1]: "P",
            questions["J/P"][2]["choices"][0]: "J", questions["J/P"][2]["choices"][1]: "P"
        }
    }

    # 2. 모든 입력값을 MBTI 코드로 변환 (빈 값 없음)
    responses = {
        "E/I": [mapping["E/I"].get(ei1, "E"), mapping["E/I"].get(ei2, "E"), mapping["E/I"].get(ei3, "E")],
        "S/N": [mapping["S/N"].get(sn1, "S"), mapping["S/N"].get(sn2, "S"), mapping["S/N"].get(sn3, "S")],
        "T/F": [mapping["T/F"].get(tf1, "T"), mapping["T/F"].get(tf2, "T"), mapping["T/F"].get(tf3, "T")],
        "J/P": [mapping["J/P"].get(jp1, "J"), mapping["J/P"].get(jp2, "J"), mapping["J/P"].get(jp3, "J")]
    }

    # 3. 각 항목에서 가장 많이 선택된 값 결정
    result = ""
    for category, answers in responses.items():
        value_counts = {value: answers.count(value) for value in set(answers)}
        most_selected = max(value_counts, key=value_counts.get)
        result += most_selected  

    return result