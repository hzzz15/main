"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Walk.css"

const walkOptions = [
  { duration: 30, price: 18000 },
  { duration: 60, price: 27000 },
  { duration: 120, price: 40500 },
]

export default function Walk() {
  const [selectedDuration, setSelectedDuration] = useState(30)
  const [wantToday, setWantToday] = useState(false)
  const navigate = useNavigate();

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration)
  }

  const getTotalPrice = () => {
    const basePrice = walkOptions.find((option) => option.duration === selectedDuration)?.price || 0
    return wantToday ? basePrice + 5000 : basePrice
  }

  const handleNextClick = () => {
    navigate("/Walk2Page"); // /Walk2Page로 이동
  }

  return (
    <div className="walk-container">
      <div className="top-section">
        <button className="back-button">←</button>

        <div className="info-section">
          <div className="info-box-container">
            <div className="info-box">
              <p>GPS 경로로 함께</p>
              <p>산책 로드 확인</p>
            </div>
            <div className="info-box">
              <p>산책이 종료되면</p>
              <p>산책 카드 도착</p>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </div>

      <div className="time-section">
        <div className="time-header">
          <h2>산책 시간</h2>
          <span className="today-label">요금표</span>
        </div>

        <div className="time-options">
          {walkOptions.map(({ duration, price }) => (
            <button
              key={duration}
              className={`time-option ${selectedDuration === duration ? "selected" : ""}`}
              onClick={() => handleDurationSelect(duration)}
            >
              <span className="duration">{duration}분</span>
              <span className="price">{price.toLocaleString()}원~</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bottom-section">
        <label className="today-option">
          <div className="checkbox-wrapper">
            <input type="checkbox" checked={wantToday} onChange={(e) => setWantToday(e.target.checked)} />
            <span className="checkbox-custom"></span>
          </div>
          <span className="today-text">오늘 바로 방문 원해요</span>
          <span className="additional-price">+5,000원</span>
        </label>

        <button className="next-button" onClick={handleNextClick}>다음으로</button>
      </div>
    </div>
  )
}
