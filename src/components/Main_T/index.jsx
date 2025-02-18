import { useNavigate } from "react-router-dom"
import "./Main_T.css"
import Weather from "./weather";

function Main_T() {
  const navigate = useNavigate()

  const handleClick = (item) => {
    switch (item) {
      case "MyProfile_T":
        navigate("/MyProfilePage")
        break
      case "Reservation_T":
        navigate("/Reservation_TPage")
        break
      case "Review_T":
        navigate("/Review_TPage")
        break
      case "Review":
        navigate("/ReviewPage")
        break
      default:
        console.log("Unknown item")
    }
  }

  return (
    <div className="Main_T-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header>
        <h1>
          <img src="/mainicons/logo.png" alt="로고" className="Main_T-logo" />
        </h1>
      </header>

      <main>
        <div className="Main_T-weather-section">
          <Weather city="Seoul" />
        </div>

        <div className="Main_T-mbti-card clickable-card" onClick={() => handleClick("MyProfile_T")}>
          <h2>MY 프로필</h2>
        </div>

        <div className="Main_T-info-grid">
          <div className="Main_T-info-card clickable-card" onClick={() => handleClick("Reservation_T")}>
            <h3>지난 예약 <br/>확인하기</h3>
            <p>GPS 경로로 함께</p>
            <p>산책 로드 확인</p>
          </div>
          <div className="Main_T-info-card clickable-card" onClick={() => handleClick("Review_T")}>
            <h3>내 후기들</h3>
            <p>유기견에게</p>
            <p>임시 쉼터를</p>
          </div>
        </div>
        <div className="Main_T-review-section clickable-card" onClick={() => handleClick("Review")}>
          <h3>후기</h3>
          <div className="Main_T-tags">
            <button className="Main_T-tag">소통 원활성</button>
            <button className="Main_T-tag">청결도</button>
            <button className="Main_T-tag">상황 공유</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Main_T
