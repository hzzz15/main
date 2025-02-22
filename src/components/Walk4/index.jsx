import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Trainer from "../Trainer"; 
import "./Walk4.css";

const trainers = [
  { id: 1, name: "김트레이너", mbti: "ENFP", compatibility: 100, image: "/trainerprofile/trainer1.jpg" },
  { id: 2, name: "이트레이너", mbti: "INFJ", compatibility: 90, image: "/trainerprofile/trainer2.jpg" },
  { id: 3, name: "박트레이너", mbti: "ENTP", compatibility: 85, image: "/trainerprofile/trainer3.jpg" },
  { id: 4, name: "최트레이너", mbti: "ISFP", compatibility: 80, image: "/trainerprofile/trainer4.jpg" },
  { id: 5, name: "정트레이너", mbti: "ESFJ", compatibility: 75, image: "/trainerprofile/trainer5.jpg" },
  { id: 6, name: "홍트레이너", mbti: "ISTJ", compatibility: 70, image: "/trainerprofile/trainer6.jpg" },
];

const Walk4 = () => {
  const navigate = useNavigate();
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (
      <div className="Walk4-container">
    {/* 헤더 (고정) */}
    <header className="Walk4-header">
      <button className="Walk4-back-button" onClick={() => navigate("/Walk3Page")}>
        <img src="/icons/back.png" alt="뒤로가기" />
      </button>
      <h1 className="Walk4-title">트레이너를 <br /> 선택하시겠습니까?</h1>
    </header>

    {/* ✅ trainer-scroll-container 추가해서 스크롤 가능하도록 */}
    <div className="Walk4-trainer-list">
        {trainers.map((trainer) => (
          <Trainer key={trainer.id} {...trainer} />
        ))}
      </div>

    {/* 하단 버튼 (고정) */}
    <div className="Walk4-bottom">
      <button className="Walk4-next-button" onClick={() => navigate("/Walk5Page")}>다음으로</button>
    </div>
  </div>
  );
};

export default Walk4;