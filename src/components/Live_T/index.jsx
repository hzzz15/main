import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import "./Live_T.css";
import Map from "../Map";
import WalkEndPopup from "../WalkEndPopup";

function Live_T() {
  const [activeTab, setActiveTab] = useState("walk");
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate(); // ✅ 네비게이션 추가

  const handleStartWalk = () => {
    setPopupMessage("산책을 시작하시겠습니까?");
    setIsPopupVisible(true);
  };

  const handleEndWalk = () => {
    setPopupMessage("산책을 종료하시겠습니까?");
    setIsPopupVisible(true);
  };

  // ✅ 팝업에서 "예" 버튼을 누르면 LiveResert_T 페이지로 이동
  const handleConfirmEndWalk = () => {
    setIsPopupVisible(false);
    navigate("/LiveResert_TPage"); // ✅ LiveResert_T 페이지로 이동
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="live-T-container">
      <header className="live-T-header">
        <div className="live-T-header-content">
          <h1>라이브</h1>
          <div className="live-T-header-buttons">
            <button
              className={`live-T-header-button ${activeTab === "walk" ? "active" : ""}`}
              onClick={() => setActiveTab("walk")}
            >
              산책 경로
            </button>
            <button
              className={`live-T-header-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              채팅 하기
            </button>
          </div>
        </div>
      </header>

      {/* 산책 경로 탭 */}
      {activeTab === "walk" && <div className="live-T-map-container"><Map /></div>}
      
      {/* 채팅 하기 탭 */}
      {activeTab === "chat" && <div className="live-T-chat-message">채팅하기 페이지 아직 미완성</div>}

      {/* 🚀 "채팅하기" 탭에서는 버튼 숨김 */}
      {activeTab === "walk" && (
        <div className="live-T-button-container">
          <button className="live-T-start-button" onClick={handleStartWalk}>산책 시작</button>
          <button className="live-T-end-button" onClick={handleEndWalk}>산책 종료</button>
        </div>
      )}

      {/* 팝업 창 */}
      {isPopupVisible && (
        <WalkEndPopup
          message={popupMessage}
          onConfirm={handleConfirmEndWalk} // ✅ "예" 버튼 클릭 시 LiveResert_T 페이지 이동
          onCancel={closePopup} // "아니요" 버튼 클릭 시 닫기
        />
      )}
    </div>
  );
}

export default Live_T;
