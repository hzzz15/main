"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DogCard from "../Dog"
import "./TemporaryCare_Re.css"

const TemporaryCare_Re = () => {
  const navigate = useNavigate()
  const [dogs, setDogs] = useState([])

   //태그 추가하고 싶으면 여기에 객체추가 { name: " 태그이름 ", isSelected: false }
  const [tags, setTags] = useState([
    { name: "", isSelected: false },
    { name: "", isSelected: false },
    { name: "", isSelected: false },
  ])

  useEffect(() => {
    fetch("data/animal_data.json")
      .then((response) => response.json())
      .then((data) => setDogs(data))
      .catch((error) => console.error("JSON 데이터를 불러오는 중 오류 발생:", error))
  }, [])

  const handleTagClick = (index) => {
    const newTags = [...tags]
    newTags[index].isSelected = !newTags[index].isSelected
    setTags(newTags)
  }

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

      <div className="TemporaryCare_Re-scrollable-content">
        <div className="TemporaryCare_Re-tags-container">
          <div className="TemporaryCare_Re-tags">
            {tags.map((tag, index) => (
              <button
                key={index}
                className={`TemporaryCare_Re-tag ${tag.isSelected ? "selected" : ""}`}
                onClick={() => handleTagClick(index)}
              >
                {tag.name} {/* #{tag.name} */}
              </button>
            ))}
          </div>
        </div>

        <main className="TemporaryCare_Re-main-content">
          <div className="TemporaryCare_Re-dogs-grid">
            {dogs.length > 0 ? (
              dogs.map((dog, index) => <DogCard key={index} dog={dog} />)
            ) : (
              <p>강아지 데이터를 불러오는 중...</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default TemporaryCare_Re

