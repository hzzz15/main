import { useState } from "react"
import "./style.css"

function Live() {
  const [activeTab, setActiveTab] = useState("walk") // 'walk' 또는 'chat'

  return (
    <div className="live-container">
      {/* 헤더 */}
      <header className="live-header">
        <div className="header-content">
          <h1>라이브</h1>
          <div className="tab-container">
            <button
              className={`tab-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>
      {/* 산책경로 탭이 활성화되었을 때 컨테이너 표시 */}
      {activeTab === "walk" && (
        <div className="content-container">{/* 여기에 산책경로 관련 컨텐츠가 들어갈 예정 */}</div>
      )}
      {/* 채팅하기 탭이 활성화되었을 때 메시지 표시 */}
      {activeTab === "chat" && <div className="chat-message">진행중인 대화가 없습니다</div>}
    </div>
  )
}

export default Live

