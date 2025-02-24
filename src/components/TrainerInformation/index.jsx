"use client"

import { useState } from "react"
import "./TrainerInformation.css"

export default function TrainerInformation() {
  const [name, setName] = useState("")
  const [mbti, setMbti] = useState("")
  const [experience, setExperience] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, mbti, experience })
  }

  return (
    <div className="trainerinformation-container">
      <header className="trainerinformation-header">
        <a href="/Profile_TPage" className="trainerinformation-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="trainerinformation-back-icon" />
        </a>

        <div className="trainerinformation-image-container">
          <div className="trainerinformation-image">
            <span className="trainerinformation-text">사진 등록</span>
          </div>
        </div>
      </header>

      <div className="trainerinformation-content">
        <form className="trainerinformation-form" onSubmit={handleSubmit}>
          <h2 className="trainerinformation-form-title">기본 사항</h2>

          <div className="trainerinformation-form-group">
            <label className="trainerinformation-label">이름</label>
            <input
              type="text"
              className="trainerinformation-form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="trainerinformation-form-group">
            <label className="trainerinformation-label">MBTI</label>
            <input
              type="text"
              className="trainerinformation-form-input"
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
            />
          </div>

          <div className="trainerinformation-form-group">
            <label className="trainerinformation-label">경력</label>
            <input
              type="text"
              className="trainerinformation-form-input"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <button type="submit" className="trainerinformation-submit-button">
            등록 완료
          </button>
        </form>
      </div>
    </div>
  )
}

