import React, { useState, useEffect } from 'react';
import './Profile_T.css';
import { supabase } from '../../lib/supabaseClient'; // 경로는 실제 환경에 맞게 조정

function Profile_T() {
  const [trainerImage, setTrainerImage] = useState(null);
  const [trainerName, setTrainerName] = useState('트레이너 프로필');
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 트레이너 정보 불러오기
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        setIsLoading(true);

        // 로그인 유저 정보 확인
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("로그인이 필요합니다:", userError);
          return;
        }

        // 트레이너 정보 조회
        const { data: trainerData, error: trainerError } = await supabase
          .from("trainers")
          .select()
          .eq("uuid_id", user.id)
          .maybeSingle();

        if (trainerError) {
          console.error("트레이너 정보 조회 실패:", trainerError);
          return;
        }

        // 트레이너 정보가 있으면 이미지 URL과 이름 설정
        if (trainerData) {
          if (trainerData.trainer_image_url) {
            setTrainerImage(trainerData.trainer_image_url);
          }
          if (trainerData.name) {
            setTrainerName(trainerData.name);
          }
        }
      } catch (err) {
        console.error("데이터 불러오기 오류:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainerData();
  }, []);

  return (
    <div className="profile-t-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      <header className="profile-t-header">
        <div className="profile-t-header-top">
          <h1>더보기</h1>
          <a href="/MyProfilePage" className="profile-t-link">내 프로필</a>
        </div>
        <div className="profile-t-header-bottom">
          <a href="/TrainerInformationPage" className="profile-t-link-container">
            <div className="profile-t-avatar">
              {isLoading ? (
                <div className="profile-t-avatar-loading"></div>
              ) : trainerImage ? (
                <img src={trainerImage || "/placeholder.svg"} alt="프로필 이미지" />
              ) : (
                <div className="profile-t-avatar-placeholder">
                  <span>이미지 없음</span>
                </div>
              )}
            </div>
            <div className="profile-t-details">
              <span>{isLoading ? '로딩 중...' : trainerName}</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="profile-t-arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      <a href="/Review_TPage" className="profile-t-report">
        <div className="profile-t-report-card">
          <img src="/profileicons/myreview.png" alt="내 리뷰 아이콘" />
          <span>내 후기 확인하기</span>
        </div>
      </a>

      <a href="/" className="profile-t-footer">
        <span className="profile-t-trainer-mode-text">견주 모드로 전환</span>
        <img
          src="/profileicons/switch.png"
          alt="전환 아이콘"
          className="profile-t-trainer-mode-icon"
        />
      </a>
    </div>
  );
}

export default Profile_T;