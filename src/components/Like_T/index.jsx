import { useState, useEffect } from "react";
import DogCard from "../Dog";
import "./Like_T.css";

function Like_T() {
  const [likedDogs, setLikedDogs] = useState([]);

  useEffect(() => {
    const storedDogs = JSON.parse(localStorage.getItem("likedDogs"));
    if (storedDogs) {
      setLikedDogs(storedDogs);
    }
  }, []);

  return (
    <div className="like-t-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header className="like-t-header">
        <div className="like-t-header-content">
          <h1>발도장</h1>
          <h2>나의 발도장이 머물렀던 댕댕이들</h2>
        </div>
      </header>
      <main className="like-t-main-content">
        <div className="like-t-dogs-grid">
          {likedDogs.length > 0 ? (
            likedDogs.map((dog, index) => (
              <DogCard key={index} dog={dog} initialLiked={true} />
            ))
          ) : (
            <div className="like-t-chat-message">저장된 강아지가 없습니다.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Like_T;
