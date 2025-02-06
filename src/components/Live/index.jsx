import { useState } from "react"
import "./Live.css"


function Live() {
  const [activeTab, setActiveTab] = useState("walk") // 'walk' 또는 'chat'

  return (
    <div className="live-container" style={{height: '100%', overflowY: 'auto'}}>
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
      {/* 산책경로 탭이 활성화되었을 때 컨테이너 표시 */}
      {activeTab === "walk" && (
        <div className="live-content-container">{/* 여기에 산책경로 관련 컨텐츠가 들어갈 예정 */}</div>
      )}
      {/* 채팅하기 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "chat" && <div className="live-chat-message">진행중인 대화가 없습니다</div>}
    </div>
  )
}

export default Live

