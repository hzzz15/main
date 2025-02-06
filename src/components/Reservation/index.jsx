import { useState } from "react"
import "./Reservation.css"

function Reservation() {
  const [activeTab, setActiveTab] = useState("now") // 'now' 또는 'last'

  return (
    <div className="reservation-container">
      {/* 헤더 */}
      <header className="reservation-header">
        <div className="reservation-header-content">
          <h1>예약내역</h1>
          <div className="reservation-header-buttons">
          <button
              className={`reservation-header-button ${activeTab === "now" ? "active" : ""}`}
              onClick={() => setActiveTab("now")}
            >
              진행 예약
            </button>
            <button
              className={`reservation-header-button ${activeTab === "last" ? "active" : ""}`}
              onClick={() => setActiveTab("last")}
            >
              지난 예약
            </button>
          </div>
        </div>
      </header>
      {/* 진행예약 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "now" && <div className="reservation-chat-message">진행예약 페이지 아직 미완성</div>}
      
      {/* 지난예약 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "last" && <div className="reservation-chat-message">지난예약 페이지 아직 미완성</div>}
    </div>
  )
}

export default Reservation

