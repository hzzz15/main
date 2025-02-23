import { useState } from "react";
import "./Dog.css";

export default function DogCard({ dog, initialLiked = false }) {
  // 초기 상태를 prop으로 받아서 설정
  const [isLiked, setIsLiked] = useState(initialLiked);

  const getDogId = () => {
    if (dog.id && typeof dog.id === "number") return dog.id;
    if (dog.URL) {
      const match = dog.URL.match(/(\d+)(\/)?$/);
      if (match) {
        const parsed = parseInt(match[1], 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    console.error("유효한 강아지 id를 추출하지 못했습니다.");
    return null;
  };

  const handlePawClick = (e) => {
    e.stopPropagation();
    const dogId = getDogId();
    if (dogId === null) return;

    // 이미 좋아요한 경우 중복 저장 방지
    if (isLiked) return;

    // localStorage에서 기존에 저장된 likedDogs 배열을 불러오거나 빈 배열로 초기화
    const likedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];
    if (!likedDogs.some((item) => item.id === dogId)) {
      likedDogs.push(dog);
      localStorage.setItem("likedDogs", JSON.stringify(likedDogs));
    }
    setIsLiked(true);
  };

  return (
    <div className="dog-card" style={{ cursor: "pointer" }}>
      <div className="dog-image">
        <img
          src={dog["이미지 URL"].split(";")[0] || "/placeholder.svg"}
          alt={`${dog["이름"]}의 프로필`}
          className="profile-image"
        />
      </div>
      <div className="dog-info">
        <h2 className="dog-name">{dog["이름"]}</h2>
        <p className="dog-details">
          {dog["몸무게"]} · {dog["성별"]}
        </p>
        <p className="dog-status">{dog["현 상황"]}</p>
      </div>
      <button
        className={`paw-button ${isLiked ? "paw-button-active" : ""}`}
        onClick={handlePawClick}
        aria-label="좋아요"
      >
        <img
          src="/temporarycareicons/paw.png"
          alt="발바닥 아이콘"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
}
