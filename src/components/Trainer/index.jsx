import React from "react";
import "./Trainer.css";

function Trainer({ name, mbti, compatibility, image }) {
  return (
    <div className="trainer-card">
      {/* 트레이너 사진 */}
      <div className="trainer-image-container">
        <img src={image} alt={name} className="trainer-image" />
      </div>

      {/* 트레이너 정보 */}
      <div className="trainer-info">
        <div className="trainer-text">
          <p className="trainer-name">{name}</p>
          <p className="trainer-mbti">{mbti}</p>
        </div>
        <div className="trainer-compatibility">
          <p>궁합</p>
          <p className="compatibility-score">{compatibility}%</p>
        </div>
      </div>
    </div>
  );
}

export default Trainer;
