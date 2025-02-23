import React from "react";
import "./Trainer.css";

function Trainer({ name, experience, trainer_mbti, match_scores, image }) {
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
          <p className="trainer-mbti">MBTI: {trainer_mbti}</p>
        </div>
        <div className="trainer-match-scores">
          <p>총 궁합: {match_scores.total_match_score}</p>
        </div>
      </div>
    </div>
  );
}

export default Trainer;
