"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import "./style.css"

export default function TemporaryChoice({ dog }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // 이미지 URL이 없는 경우를 대비해 기본값으로 빈 배열 설정
  const images = dog["이미지 URL"] ? dog["이미지 URL"].split(";").filter(Boolean) : []

  return (
    <div className="temporary-choice">
      <header className="choice-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="choice-content">
        <div className="image-container">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${dog["이름"]}의 사진 ${currentImageIndex + 1}`}
            className="main-image"
          />
          {images.length > 1 && (
            <div className="image-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`${index + 1}번 사진으로 이동`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="dog-details">
          <div className="details-content">
            <h1 className="dog-name">{dog["이름"]}</h1>
            <p className="basic-info">
              {dog["몸무게"]} · {dog["성별"]} · {dog["출생시기"]}
            </p>
            <p className="status-info">
              {dog["현 상황"]} ({dog["임보종류"]})
            </p>
            <p className="location-info">{dog["구조 지역"]}</p>

            <div className="details-section">
              <h2>성격 및 특징</h2>
              <p>{dog["성격 및 특징"]}</p>
            </div>

            {dog["구조사연"] && (
              <div className="details-section">
                <h2>구조 사연</h2>
                <p>{dog["구조사연"]}</p>
              </div>
            )}
          </div>
        </div>

        <button className="inquiry-button">임보신청 문의하기</button>
      </main>
    </div>
  )
}

