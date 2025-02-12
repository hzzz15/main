import React, { useState, useEffect } from "react";
import DogCard from "../Dog";
import { ArrowLeft } from "lucide-react";
import "./TemporaryCare_Re.css";

export default function TemporaryCare_Re() {
  // 강아지 데이터를 저장할 state
  const [dogs, setDogs] = useState([]);

  // JSON 파일 불러오기
  useEffect(() => {
    fetch("data/animal_data.json") // public 폴더의 animal_data.json을 불러옴
      .then((response) => response.json())
      .then((data) => setDogs(data))
      .catch((error) => console.error("JSON 데이터를 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <div className="temporary-care">
      <header className="care-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <ArrowLeft size={24} />
        </button>
        <div className="header-content">
          <h1 className="care-title">맞춤추천</h1>
          <p className="care-description">
            당신의 마음과 닮은 강아지를 찾아보세요
            <br />
            특별한 인연을 맺고, 함께 행복한 추억을 만들어가요! 
          </p>
        </div>
      </header>

      <main className="care-content">
        <div className="dogs-grid">
          {dogs.length > 0 ? (
            dogs.map((dog, index) => <DogCard key={index} dog={dog} />)
          ) : (
            <p>강아지 데이터를 불러오는 중...</p>
          )}
        </div>
      </main>
    </div>
  );
}
