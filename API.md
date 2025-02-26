
### **사용자 API**

** 회원가입 : 새로운 사용자를 등록
[POST] /users/signup**


** 로그인 : 이메일과 비밀번호를 입력해 로그인
[POST] /users/login


### **매칭 API** 
** 강아지 MBTI 조회 : 강아지 댕bti 테스트 후 결과 저장
[GET] /api/submitMbtiTest

**Request
{
  "mbti": "string"
}

**Response
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

** 산책 매칭 : 특정 반려동물(pet_id)에 대해 트레이너를 추천받음
[GET] /match/pet/{pet_id}/matches

**Request
{
  "pet": {
    "name": "string",
    "breed": "string",
    "size": "string",
    "weight": 0,
    "gender": "string",
    "notes": "string",
    "pet_mbti": "string",
    "is_neutered": false,
    "image_url": "string",
    "birth_date": "string",
    "id": 0,
    "uuid_id": "string"
  },
  "matches": [
    {
      "trainer_id": 0,
      "trainer_mbti": "string",
      "experience": 0,
      "mbti_match_score": 0,
      "activity_match_score": 0,
      "total_match_score": 0,
      "trainer_image_url": "string",
      "name": "string",
      "recommendation": "string"
    }
  ]
}

**Response
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

** 임보 테스트 : 임시보호 테스트로 사용자와 강아지 태그 교집합 계산
[GET] /api/recommend_dogs

**Request
"string"

**Response
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

