import { useNavigate } from "react-router-dom"
import "./Review.css"

function Review() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/")
  }

  // 평점을 문자열로 변환하는 함수
  const getRating = (rating) => {
    return `평점: ${rating.toFixed(1)}`
  }

  return (
    <div className="review-container">
      {/* 헤더 (고정) */}
      <header className="review-header">
        <div className="review-header-content">
          <img src="/reviewicons/back.png" alt="뒤로가기" className="review-back-icon" onClick={handleBackClick} />
          <h1>후기</h1>
        </div>
      </header>

      {/* 스크롤 가능한 컨테이너 */}
      <div className="review-scrollable-container">
        {/* 태그 부분 */}
        <div className="review-tags">
          <button className="review-tag">소통 원활성</button>
          <button className="review-tag">청결도</button>
          <button className="review-tag">상황 공유</button>
        </div>

        {/* 리뷰 카드 (반복) */}
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div className="review-card" key={index}>
            <div className="review-profile">
              <img src="/trainerprofile/trainer.jpg" alt="프로필 이미지" className="review-avatar-image" />
              <div className="review-info">
                <span className="reviewer-name">ㅇㅇㅇ트레이너님</span>
                <div className="review-rating">
                  {getRating(4.5)} {/* 예시로 4.5점을 사용 */}
                </div>
              </div>
            </div>
            <div className="review-content-box">{/* 리뷰 내용이 들어갈 자리 */}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review