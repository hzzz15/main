import { useState } from "react"
import "./New.css"

function New() {
  const [activeTab, setActiveTab] = useState("walk") // 'walk' 또는 'chat'

  return (
    <div className="new-container" style={{height: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="new-header">
        <div className="new-header-content">
          <h1>New라이브</h1>
          <div className="new-header-buttons">
          <button
              className={`new-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`new-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default New

