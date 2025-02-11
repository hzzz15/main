import { Link } from "react-router-dom"
import "./Last.css"

function Last() {
  return (
    <div className="last-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      {/* 헤더 */}
      <header className="last-header">
        <div className="last-header-content">
          <h1>예약내역</h1>
          <div className="last-header-buttons">
            <Link
              to="/ReservationPage"
              className="last-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              진행 예약
            </Link>
            <button className="last-header-button active" style={{ background: "none", border: "none" }}>
              지난 예약
            </button>
          </div>
        </div>
      </header>
      {/* 2025년 예약 버튼 */}
      <button className="last-year-button">
        <img src="/reservationlasticons/calendar.png" alt="Calendar" className="last-year-button-icon" />
        2025년 예약
      </button>
      {/* 메인 컨텐츠 */}
      <div className="last-chat-message">
        <div>
          해당 연도의 예약이 없어요
          <br />
          <br />
          다른 연도를 선택해보세요
        </div>
      </div>
    </div>
  )
}

export default Last

