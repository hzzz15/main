import React from 'react';
import './style.css';

function Profile() {
  return (
    <div className="profile-container">
      {/* 헤더 */}
      <header className="profile-header">
        <div className="header-top">
          <h1>더보기</h1>
          <a href="/my-profile" className="profile-link">내 프로필</a>
        </div>
        <div className="header-bottom">
          <a href="/pet-profile" className="profile-link-container">
            <div className="profile-avatar">
              <img src="/profileicons/avatar.png" alt="프로필 이미지" />
            </div>
            <div className="profile-details">
              <span>반려동물 프로필</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      {/* 리포트 */}
      <a href="/ResultLastPage" className="profile-report">
        <div className="report-card">
          <img src="/profileicons/report.png" alt="리포트 아이콘" />
          <span>지난 산책 리포트</span>
        </div>
      </a>

      {/* 트레이너 모드로 전환 */}
      <a href="/trainer-mode" className="profile-footer">
        <span className="trainer-mode-text">트레이너 모드로 전환</span>
        <img
          src="/profileicons/switch.png"
          alt="전환 아이콘"
          className="trainer-mode-icon"
        />
      </a>
    </div>
  );
}

export default Profile;
