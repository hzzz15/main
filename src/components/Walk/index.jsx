"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Walk.css";

const walkOptions = [
  { duration: 30, price: 18000 },
  { duration: 60, price: 27000 },
  { duration: 120, price: 40500 },
];

const walkDescriptions = {
  30: [
    "- 가벼운 산책이 필요한 강아지에게 추천",
    "- 노견이나 실외배변이 필요한 경우",
    "- 산책 후 간단한 배식, 환경 정리만 요청 가능",
  ],
  60: [
    "- 충분한 후각 활동 및 산책 시간이 필요한 경우",
    "- 강아지를 위한 하루 적정 운동량 충족 가능",
    "- 산책 후 배식, 놀이, 배변, 환경 정리 요청 가능",
  ],
  120: [
    "- 많은 활동량이 필요한 강아지에게 추천",
    "- 장시간 산책이 필요하거나 다견 가정인 경우",
    "- 산책 후 배식, 놀이, 배변, 환경 정리 요청 가능",
  ],
};

export default function Walk() {
  const [selectedDuration, setSelectedDuration] = useState(30); // ✅ 기본값 30분 선택
  const [wantToday, setWantToday] = useState(false);
  const navigate = useNavigate();

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="Walk-container">
      <div className="Walk-top-section">
        <button className="Walk-back-button" onClick={() => navigate("/")}>
          <img src="/icons/back.png" alt="뒤로가기" className="Walk-back-icon" />
        </button>

        <div className="Walk-info-section">
          <div className="Walk-info-box-container">
            <div className="Walk-info-box">
              <p>GPS 경로로 함께</p>
              <p>산책 로드 확인</p>
            </div>
            <div className="Walk-info-box">
              <p>산책이 종료되면</p>
              <p>산책 카드 도착</p>
            </div>
          </div>
          <div className="Walk-divider"></div>
        </div>
      </div>

      <div className="Walk-time-section">
        <div className="Walk-time-header">
          <h2>산책 시간</h2>
          <span
            className="Walk-today-label"
            onClick={() => navigate("/PricePage")}
            style={{ cursor: "pointer", color: "#006400", textDecoration: "underline" }}
          >
            요금표
          </span>
        </div>

        <div className="Walk-time-options">
          {walkOptions.map(({ duration, price }) => (
            <div key={duration} className="Walk-time-option-wrapper">
              <button
                className={`Walk-time-option ${selectedDuration === duration ? "selected" : ""}`}
                onClick={() => handleDurationSelect(duration)}
              >
                {duration}분
              </button>
              <span className={`Walk-price ${selectedDuration === duration ? "selected-price" : ""}`}>
                {price.toLocaleString()}원~
              </span>
            </div>
          ))}
        </div>

        {/* ✅ 선택된 옵션에 따라 설명 변경 */}
        <div className="Walk-description">
          {walkDescriptions[selectedDuration].map((desc, index) => (
            <p key={index} className="Walk-description-text">{desc}</p>
          ))}
        </div>
      </div>

      <div className="Walk-bottom-section">
        <label className="Walk-today-option">
          <div className="Walk-checkbox-wrapper">
            <input type="checkbox" checked={wantToday} onChange={(e) => setWantToday(e.target.checked)} />
            <span className="Walk-checkbox-custom"></span>
          </div>
          <span className="Walk-today-text">오늘 바로 방문 원해요</span>
          <span className="Walk-additional-price">+5,000원</span>
        </label>

        <button className="Walk-next-button" onClick={() => navigate("/Walk2Page")}>
          다음으로
        </button>
      </div>
    </div>
  );
}
 