import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로컬 스토리지에서 사용자 정보 삭제
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    
    // 로그인 페이지로 리다이렉트
    navigate('/IntroPage');
  };

  return (
    <div className="profile-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="profile-header">
        <div className="profile-header-top">
          <h1>더보기</h1>
          <div className="profile-actions">
            <button onClick={handleLogout} className="profile-logout-button">로그아웃</button>
            <a href="/MyProfilePage" className="profile-link">내 프로필</a>
          </div>
        </div>
        <div className="profile-header-bottom">
          <a href="/DogInformationPage" className="profile-link-container">
            <div className="profile-avatar">
              <img src="/dogprofile/dog.jpg" alt="프로필 이미지" />
            </div>
            <div className="profile-details">
              <span>반려동물 프로필</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="profile-arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      {/* 리포트 */}
      <a href="/ResultLastPage" className="profile-report">
        <div className="profile-report-card">
          <img src="/profileicons/report.png" alt="리포트 아이콘" />
          <span>지난 산책 리포트</span>
        </div>
      </a>
      {/* 트레이너 모드로 전환 */}
      <a href="/trainer-mode" className="profile-footer">
        <span className="profile-trainer-mode-text">트레이너 모드로 전환</span>
        <img
          src="/profileicons/switch.png"
          alt="전환 아이콘"
          className="profile-trainer-mode-icon"
        />
      </a>
    </div>
  );
}

export default Profile;