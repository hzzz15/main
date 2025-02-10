"use client"

import DogCard from "../Dog"
import "./TemporaryCare_Re.css"

// 임시 데이터
const recommendedDogs = [
  {
    이름: "추천강아지1",
    "이미지 URL": "/placeholder.svg",
    몸무게: "5kg",
    성별: "수컷",
    "현 상황": "임시보호 가능",
  },
  {
    이름: "추천강아지2",
    "이미지 URL": "/placeholder.svg",
    몸무게: "3kg",
    성별: "암컷",
    "현 상황": "임시보호 가능",
  },
  {
    이름: "추천강아지3",
    "이미지 URL": "/placeholder.svg",
    몸무게: "4kg",
    성별: "수컷",
    "현 상황": "임시보호 가능",
  },
  {
    이름: "추천강아지4",
    "이미지 URL": "/placeholder.svg",
    몸무게: "6kg",
    성별: "암컷",
    "현 상황": "임시보호 가능",
  },
]

const TemporaryCare_Re = () => {
  return (
    <div className="temporary-care">
      <header className="header">
        <div className="header-content">
          <button className="back-button">←</button>
          <div className="title-description">
            <h1>맞춤추천</h1>
            <p className="description">
              당신의 마음과 맞는 상아지를 찾아보세요
              <br />
              특별한 인연을 맺고, 함께 행복한 추억을 만들어가요!
            </p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="dogs-grid">
          {recommendedDogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default TemporaryCare_Re

