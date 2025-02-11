"use client";

import { useNavigate } from "react-router-dom";
import "./Dbti_result.css";

const DbtiResult = () => {
  const navigate = useNavigate();

  return (
    <div className="DbtiResult-container">
      {/* 헤더 */}
      <header className="DbtiResult-header">
        <div className="DbtiResult-header-content">
          <img
            src="/resultlasticons/back.png"
            alt="뒤로가기"
            className="DbtiResult-back-icon"
            onClick={() => navigate(-1)}
          />
          <h1>멍BTI TEST</h1>
          <p className="DbtiResult-description">우리 댕댕이의 멍BTI를 검사해보세요!</p>
        </div>
      </header>

      {/* 결과 박스 */}
      <div className="DbtiResult-box">
        <p className="DbtiResult-text">결과 표시 영역</p>
      </div>

      {/* 등록하기 버튼 */}
      <button className="DbtiResult-button">등록하기</button>
    </div>
  );
};

export default DbtiResult;
