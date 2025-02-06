import { useState } from "react"
import "./Live.css"


function Live() {
  const [activeTab, setActiveTab] = useState("walk") // 'walk' 또는 'chat'

  return (
    <div className="live-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="live-header">
        <div className="live-header-content">
          <h1>라이브</h1>
          <div className="live-header-buttons">
          <button
              className={`live-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`live-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>
      {/* 진행예약 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "walk" && <div className="live-chat-message">진행예약 페이지 아직 미완성</div>}
      
      {/* 지난예약 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "chat" && <div className="live-chat-message">지난예약 페이지 아직 미완성</div>}
    </div>
  )
}

export default Live

