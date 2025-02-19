import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Main.css";
import Weather from "./weather";

function Main() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weatherLocation, setWeatherLocation] = useState(() => {
    // 초기 상태를 로컬 스토리지에서 가져오거나 기본값 설정
    const storedWeatherLocation = localStorage.getItem('weatherLocation');
    return storedWeatherLocation ? JSON.parse(storedWeatherLocation) : { city: '서울특별시', district: '강남구' }; //날씨정보 입력하는곳
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("로그인 토큰:", token);
    setIsLoggedIn(!!token);

    // 날씨 정보를 로컬 스토리지에 저장
    localStorage.setItem('weatherLocation', JSON.stringify(weatherLocation));
  }, [weatherLocation]);

  const handleClick = (item) => {
    console.log("현재 로그인 상태:", isLoggedIn);

    if (!isLoggedIn) {
      console.log("로그인 필요! 인트로페이지로 이동");
      navigate("/IntroPage");
      return;
    }

    switch (item) {
      case "dbti":
        navigate("/DbtiPage");
        break;
      case "walk":
        navigate("/WalkPage");
        break;
      case "temporarycare":
        navigate("/TemporaryCarePage");
        break;
      case "review":
        navigate("/ReviewPage");
        break;
      default:
        console.log("Unknown item");
    }
  };

  return (
    <div className="main-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header>
        <h1>
          <img src="/mainicons/logo.png" alt="로고" className="main-logo" />
        </h1>
      </header>

      <main>
        <div className="main-weather-section">
          {weatherLocation.city && weatherLocation.district ? (
            <Weather city={weatherLocation.city} district={weatherLocation.district} />
          ) : (
            <div>날씨 정보를 불러오는 중...</div>
          )}
        </div>

        <div className="main-mbti-card clickable-card" onClick={() => handleClick("dbti")}>
          <h2>우리 댕댕이의 멍BTI는?!</h2>
        </div>

        <div className="main-info-grid">
          <div className="main-info-card clickable-card" onClick={() => handleClick("walk")}>
            <h3>산책</h3>
            <p>GPS 경로로 함께</p>
            <p>산책 로드 확인</p>
          </div>
          <div className="main-info-card clickable-card" onClick={() => handleClick("temporarycare")}>
            <h3>임시보호</h3>
            <p>유기견에게</p>
            <p>임시 쉼터를</p>
          </div>
        </div>
        <div className="main-review-section clickable-card" onClick={() => handleClick("review")}>
          <h3>후기</h3>
          <div className="main-tags">
            <button className="main-tag">소통 원활성</button>
            <button className="main-tag">청결도</button>
            <button className="main-tag">상황 공유</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;