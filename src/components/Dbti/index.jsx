import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dbti.css"; 

const questions = {
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
};

const MBTITest = () => {
  const navigate = useNavigate();
  const allQuestions = Object.values(questions).flat();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null); // 선택한 답변 상태 추가

  const handleBackClick = () => {
    navigate(-1); // 🔹 뒤로 가기 기능
  };

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const handleNext = () => {
    if (selectedChoice) {
      setAnswers([...answers, selectedChoice]);
      setSelectedChoice(null); // 다음 질문으로 넘어갈 때 선택 초기화
      if (currentIndex < allQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        saveResult();
      }
    }
  };

  const saveResult = () => {
    const mbti = ["E/I", "S/N", "T/F", "J/P"].map((category, index) => {
      const subAnswers = answers.slice(index * 3, (index + 1) * 3);
      return subAnswers.filter((val) => val === category[0]).length >= 2
        ? category[0]
        : category[2];
    }).join("");


  };

  return (
    <div className="Dbti-test-container">
      {/* 헤더 추가 (고정) */}
      <header className="Dbti-test-header">
        <div className="Dbti-test-header-content">
          <img
            src="/resultlasticons/back.png"
            alt="뒤로가기"
            className="Dbti-test-back-icon"
            onClick={handleBackClick}
          />
          <h1>ㄷㄹㄷ 멍bti 테스트</h1>
        </div>
      </header>

      {/* 진행도 바 */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${(currentIndex + 1) / allQuestions.length * 100}%` }} />
      </div>

      {/* MBTI 테스트 컨텐츠 */}
      <div className="test-container">
      {/* 질문 번호 + 질문 내용 */}
      <h2 className="question-number">질문 {currentIndex + 1}.</h2>
      <h1 className="question-text">{allQuestions[currentIndex].question}</h1>

      {/* 선택 버튼 */}
      <div className="choices-container">
        {allQuestions[currentIndex].choices.map((choice, index) => (
          <button 
            key={index} 
            onClick={() => handleChoiceSelect(choice)} 
            className={`choice-button ${selectedChoice === choice ? "selected" : ""}`} // 선택된 버튼 스타일 적용
          >
            {choice}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button 
        className={`next-button ${selectedChoice ? "" : "disabled"}`} 
        onClick={handleNext} 
        disabled={!selectedChoice} // 선택하지 않으면 비활성화
      >
        다음 →
      </button>
      </div>
    </div>
  );
};

export default MBTITest; 