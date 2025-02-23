import { useState } from "react";
import "./Dog.css";

export default function DogCard({ dog, initialLiked = false }) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const getDogId = (dogData) => {
    // dogData가 없으면 현재 dog 사용
    const targetDog = dogData || dog;

    if (targetDog.id && typeof targetDog.id === "number") return targetDog.id;
    if (targetDog.URL) {
      const match = targetDog.URL.match(/(\d+)(\/)?$/);
      if (match) {
        const parsed = parseInt(match[1], 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    // ID를 찾을 수 없는 경우, 이름과 이미지 URL을 조합하여 고유 식별자 생성
    return `${targetDog["이름"]}-${targetDog["이미지 URL"]}`;
  };

  const handlePawClick = (e) => {
    e.stopPropagation();
    const currentDogId = getDogId();
    
    // localStorage에서 기존 데이터 가져오기
    let likedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];

    if (isLiked) {
      // 이미 좋아요 상태인 경우: localStorage에서 제거
      likedDogs = likedDogs.filter((likedDog) => {
        const likedDogId = getDogId(likedDog);
        return likedDogId !== currentDogId;
      });
      localStorage.setItem("likedDogs", JSON.stringify(likedDogs));
      setIsLiked(false);
    } else {
      // 좋아요하지 않은 상태인 경우: localStorage에 추가
      const isDogAlreadyLiked = likedDogs.some((likedDog) => {
        const likedDogId = getDogId(likedDog);
        return likedDogId === currentDogId;
      });

      if (!isDogAlreadyLiked) {
        likedDogs.push(dog);
        localStorage.setItem("likedDogs", JSON.stringify(likedDogs));
      }
      setIsLiked(true);
    }
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