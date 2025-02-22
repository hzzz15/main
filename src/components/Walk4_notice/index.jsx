import React from "react";
import { useNavigate } from "react-router-dom";
import "./Walk4_notice.css";

const Walk4_notice = () => {
  const navigate = useNavigate();

  return (
    <div className="Walk4_notice-container">
      {/* 헤더 (Walk4와 동일) */}
      <header className="Walk4_notice-header">
        <button className="Walk4_notice-back-button" onClick={() => navigate("/Walk4Page")}> 
          <img src="/icons/back.png" alt="뒤로가기" />
        </button>
        <h1 className="Walk4_notice-title">🧩 궁합 점수는 <br /> 이렇게 계산돼요!</h1>
      </header>

      {/* 설명 섹션 */}
      <div className="Walk4_notice-content">
        <p>댕로드는 강아지와 보호자가 잘 맞는 파트너를<br/> 찾을 수 있도록 궁합 점수를 활용해요.</p>
        
        <h3>1️⃣ 성향 궁합 분석</h3>
        <p>보호자와 강아지의 성향이 얼마나 비슷한지를 평가해요. 성향이 비슷할수록 높은 점수를 받을 수 있어요.</p>
        
        <h3>2️⃣ 에너지 레벨 매칭</h3>
        <p>활발한 강아지는 활발한 보호자와, <br/>차분한 강아지는 차분한 보호자와 더 잘 맞아요. <br/>강아지와 보호자의 에너지 레벨을 고려해 점수를 <br/>조정해요.</p>
        
        <h3>3️⃣ 트레이너 경험 반영</h3>
        <p>보호자가 강아지 돌봄 경험이 많다면, <br/>강아지를 더 잘 케어할 수 있겠죠? <br/>이런 경험도 점수에 반영해요.</p>
        
        <h3>⚠️ 알려드립니다!</h3>
        <p>차분한 강아지에게 활발한 보호자를 매칭하려면, <br/>궁합 점수가 낮은 트레이너를 선택하게 됩니다. <br/>이 점 참고해 주세요.</p>
      </div>
    </div>
  );
};

export default Walk4_notice;
