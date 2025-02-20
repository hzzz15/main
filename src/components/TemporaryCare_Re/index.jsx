"use client"

import { useLocation, useNavigate } from "react-router-dom"
import DogCard from "../Dog"
import "./TemporaryCare_Re.css"

const TemporaryCare_Re = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ FastAPI에서 받은 추천된 강아지 리스트 그대로 사용
  const recommendedDogs = location.state?.recommendedDogs || []

  return (
    <div className="TemporaryCare_Re-temporary-care">
      <header className="TemporaryCare_Re-header">
        <div className="TemporaryCare_Re-header-content">
          <button className="TemporaryCare_Re-back-button">
            <img
              src="/icons/back.png"
              alt="뒤로가기"
              className="TemporaryCare_Re-back-icon"
              onClick={() => navigate("/TemporaryCarePage")}
            />
          </button>
          <div className="TemporaryCare_Re-title-description">
            <h1>맞춤추천</h1>
            <p className="TemporaryCare_Re-description">
              당신의 마음과 맞는 강아지를 찾아보세요
              <br />
              특별한 인연을 맺고, 함께 행복한 추억을 만들어가요!
            </p>
          </div>
        </div>
      </header>

      <main className="TemporaryCare_Re-main-content">
        <div className="TemporaryCare_Re-dogs-grid">
          {recommendedDogs.length > 0 ? (
            recommendedDogs.map((dog, index) => <DogCard key={index} dog={dog} />)
          ) : (
            <p>추천된 강아지가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default TemporaryCare_Re
