import { useNavigate } from "react-router-dom"
import "./ResultLast.css"

function ResultLast() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/ProfilePage")
  }

  return (
    <div className="resultlast-container">
      {/* 헤더 */}
      <header className="resultlast-header">
        <div className="resultlast-header-content">
          <img
            src="/resultlasticons/back.png"
            alt="뒤로가기"
            className="resultlast-back-icon"
            onClick={handleBackClick}
          />
          <h1>지난산책리포트</h1>
        </div>
      </header>

      {/* 스크롤 가능한 산책 리포트 카드 컨테이너 */}
      <div className="resultlast-scrollable-container">

        {/* 산책 리포트 카드 */}
        <div className="resultlast-walk-report-card">
          <div className="resultlast-report-date">0000년 00월 00일</div>
          <div className="resultlast-report-title">○○이 산책 리포트</div>

          <div className="resultlast-profile-section">
            <div className="resultlast-profile-circle resultlast-dog-photo">
              <img src="/resultlasticons/dogavatar.png" alt="강아지사진" />
            </div>
            <div className="resultlast-paw-prints">
              <img src="/resultlasticons/paw.png" alt="발자국" className="resultlast-paw-icon" />
            </div>
            <div className="resultlast-profile-circle resultlast-user-photo">
              <img src="/resultlasticons/avatar.png" alt="프로필" />
            </div>
          </div>

          <div className="resultlast-walk-details">
            <div className="resultlast-detail-item">
              <h3>걸음수 : 00</h3>
            </div>

            <div className="resultlast-detail-item">
              <h3>시간</h3>
              <p>00시00분 ~ 00시00분</p>
            </div>

            <div className="resultlast-detail-item">
              <h3>특이사항</h3>
              <div className="resultlast-notes-box"></div>
            </div>
          </div>
        </div>

        {/* 산책 리포트 카드 */}
        <div className="resultlast-walk-report-card">
          <div className="resultlast-report-date">0000년 00월 00일</div>
          <div className="resultlast-report-title">○○이 산책 리포트</div>

          <div className="resultlast-profile-section">
            <div className="resultlast-profile-circle resultlast-dog-photo">
              <img src="/resultlasticons/dogavatar.png" alt="강아지사진" />
            </div>
            <div className="resultlast-paw-prints">
              <img src="/resultlasticons/paw.png" alt="발자국" className="resultlast-paw-icon" />
            </div>
            <div className="resultlast-profile-circle resultlast-user-photo">
              <img src="/resultlasticons/avatar.png" alt="프로필" />
            </div>
          </div>

          <div className="resultlast-walk-details">
            <div className="resultlast-detail-item">
              <h3>걸음수 : 00</h3>
            </div>

            <div className="resultlast-detail-item">
              <h3>시간</h3>
              <p>00시00분 ~ 00시00분</p>
            </div>

            <div className="resultlast-detail-item">
              <h3>특이사항</h3>
              <div className="resultlast-notes-box"></div>
            </div>
          </div>
        </div>

        {/* 산책 리포트 카드 */}
        <div className="resultlast-walk-report-card">
          <div className="resultlast-report-date">0000년 00월 00일</div>
          <div className="resultlast-report-title">○○이 산책 리포트</div>

          <div className="resultlast-profile-section">
            <div className="resultlast-profile-circle resultlast-dog-photo">
              <img src="/resultlasticons/dogavatar.png" alt="강아지사진" />
            </div>
            <div className="resultlast-paw-prints">
              <img src="/resultlasticons/paw.png" alt="발자국" className="resultlast-paw-icon" />
            </div>
            <div className="resultlast-profile-circle resultlast-user-photo">
              <img src="/resultlasticons/avatar.png" alt="프로필" />
            </div>
          </div>

          <div className="resultlast-walk-details">
            <div className="resultlast-detail-item">
              <h3>걸음수 : 00</h3>
            </div>

            <div className="resultlast-detail-item">
              <h3>시간</h3>
              <p>00시00분 ~ 00시00분</p>
            </div>

            <div className="resultlast-detail-item">
              <h3>특이사항</h3>
              <div className="resultlast-notes-box"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResultLast

