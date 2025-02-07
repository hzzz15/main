import { useNavigate } from "react-router-dom"
import "./Review.css"

function Review() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/")
  }

  return (
    <div className="review-container" style={{ height: "100%", overflowY: "auto" }}>
      {/* 헤더 (고정) */}
      <header className="review-header">
        <div className="review-header-content">
          <img src="/reviewicons/back.png" alt="뒤로가기" className="review-back-icon" onClick={handleBackClick} />
          <h1>후기</h1>
        </div>
      </header>

      {/* 스크롤 가능한 리뷰 카드 컨테이너 */}
      <div className="review-scrollable-container">
        {/* 리뷰 카드 (반복) */}
        {[1, 2, 3].map((_, index) => (
          <div className="review-card" key={index}>
            <div className="review-profile">
              <img src="/reviewicons/avatar.png" alt="프로필 이미지" className="review-avatar-image" />
              <div className="review-info">
                <span className="reviewer-name">ㅇㅇㅇ트레이너님</span>
                <div className="review-star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img key={star} src="/reviewicons/star.png" alt="별점" className="review-star" />
                  ))}
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

