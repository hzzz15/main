"use client"

import { Link } from "react-router-dom"
import "./ReservationMatch.css"

function ReservationMatch() {
  return (
    <div className="reservationmatch-container">
      <header className="reservationmatch-header">
        <div className="reservationmatch-header-content">
          <h1>예약내역</h1>
          <div className="reservationmatch-header-buttons">
            <button
              className="reservationmatch-header-button active"
            >
              진행 예약
            </button>
            <Link
              to="/ReservationLastPage"
              className="reservationmatch-header-button"
              style={{ background: 'none', border: 'none', textDecoration: 'none' }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>

      <div className="reservationmatch-match-content">
        <div className="reservationmatch-match-card">
          <div className="reservationmatch-match-date">0000년 00월 00일</div>
          <div className="reservationmatch-match-status">매칭중...</div>
          <div className="reservationmatch-match-players">
            <div className="reservationmatch-player">
              <div className="reservationmatch-player-avatar">
                <img src="/dogprofile/dog.jpg" alt="강아지 사진" className="reservationmatch-avatar-image" />
              </div>
              <div className="reservationmatch-player-name">이름</div>
              <div className="reservationmatch-player-detail">멍BTI</div>
            </div>
            <div className="reservationmatch-match-image">
              <img src="/reservationmatchicons/matching.png" alt="Matching" className="reservationmatch-match-icon" />
            </div>
            <div className="reservationmatch-trainer">
              <div className="reservationmatch-trainer-avatar">
                <div className="reservationmatch-question-mark">?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationMatch