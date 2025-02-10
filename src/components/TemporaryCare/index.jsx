"use client"

import DogCard from "../Dog"
import "./TemporaryCare.css"
import { dogs } from "../../app/data"

const TemporaryCare = () => {
  return (
    <div className="temporary-care">
      <header className="header">
        <div className="header-content">
          <button className="back-button">←</button>
          <div className="title-description">
            <h1>임시 보호</h1>
            <p className="description">
              임시보호를 기다리는 작은 발자국들,
              <br />
              당신의 손길을 기다립니다
            </p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <button className="matching-button">당신과 찰떡인 강아지 맞춤추천</button>

        <div className="dogs-grid">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default TemporaryCare

