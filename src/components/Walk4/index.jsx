import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Trainer from "../Trainer"; 
import "./Walk4.css";

const Walk4 = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const pet_id = 1; // 예시

  useEffect(() => {
    if (!pet_id) {
      // pet_id가 없으면 에러 처리하거나, 이전 페이지로 리다이렉트
      console.error("pet_id가 전달되지 않았습니다.");
      return;
    }
    fetch(`http://localhost:8000/match/pet/${pet_id}/matches`)
      .then((res) => res.json())
      .then((data) => {
        console.log("전체 응답:", data);
        console.log("matches 배열:", data.matches);
        // 백엔드에서 받은 matches 배열의 각 항목을 원하는 데이터 구조로 매핑합니다.
        const mappedTrainers = data.matches.map((match) => {
          return {
            id: match.trainer_id,
            name: match.name,
            experience: match.experience,
            trainer_mbti: match.trainer_mbti,
            // match_scores 객체로 세부 점수들을 묶어서 전달
            match_scores: {
              mbti_match_score: match.mbti_match_score,
              activity_match_score: match.activity_match_score,
              total_match_score: match.total_match_score,
            },
            image: match.image_url
          };
        });
        setTrainers(mappedTrainers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("추천 트레이너 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, [pet_id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="Walk4-container">
      <header className="Walk4-header">
        <button className="Walk4-back-button" onClick={() => navigate("/Walk3Page")}>
          <img src="/icons/back.png" alt="뒤로가기" />
        </button>
        <h1 className="Walk4-title">
          트레이너를 <br /> 선택하시겠습니까?
        </h1>
      </header>

      <div className="Walk4-trainer-list">
        {trainers.map((trainer) => (
          <Trainer key={trainer.id} {...trainer} />
        ))}
      </div>

      <div className="Walk4-bottom">
        <button className="Walk4-next-button" onClick={() => navigate("/Walk5Page")}>
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Walk4;
