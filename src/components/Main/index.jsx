import React from 'react';
import './style.css';

function Main() {
    return (
      <div className="container">
        <header>
          <h1>ㄷㄹㄷ</h1>
        </header>
  
        <main>
          <div className="weather-section">
            <h2>날씨</h2>
          </div>
  
          <div className="mbti-card">
            <h2>우리 댕댕이의 멍BT는?!</h2>
          </div>
  
          <div className="info-grid">
            <div className="info-card">
              <h3>산책</h3>
              <p>GPS 경로로 함께</p>
              <p>산책 로드 확인</p>
            </div>
            <div className="info-card">
              <h3>임시보호</h3>
              <p>유기견에게</p>
              <p>임시 쉼터를</p>
            </div>
          </div>
          <div className="review-section">
            <h3>후기</h3>
            <div className="tags">
              <button class="tag">소통 원활성</button>
              <button class="tag">청결도</button>
              <button class="tag">상황 공유</button>
            </div>
          </div>
        </main>
      </div>
    )
  }
  export default Main
  