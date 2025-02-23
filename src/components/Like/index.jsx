import { useState, useEffect } from "react";
import DogCard from "../Dog";
import "./Like.css";

function Like() {
  const [likedDogs, setLikedDogs] = useState([]);

  useEffect(() => {
    const storedDogs = JSON.parse(localStorage.getItem("likedDogs"));
    if (storedDogs) {
      setLikedDogs(storedDogs);
    }
  }, []);

  return (
    <div className="like-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header className="like-header">
        <div className="like-header-content">
          <h1>발도장</h1>
          <h2>나의 발도장이 머물렀던 댕댕이들</h2>
        </div>
      </header>
      <main className="like-main-content">
        <div className="like-dogs-grid">
          {likedDogs.length > 0 ? (
            likedDogs.map((dog, index) => (
              <DogCard key={index} dog={dog} initialLiked={true} />
            ))
          ) : (
            <p>저장된 강아지가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Like;
