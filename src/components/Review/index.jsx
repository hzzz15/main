import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Review.css";
import { Rewind } from "lucide-react";

function Review() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]); 
  const [ratings, setRatings] = useState([]);

  const [selectedTag, setSelectedTag] = useState(null)


  // ✅ 백엔드 API 호출 함수
  const fetchReviews = async (tag = null) => {
    try {
      let url = "http://127.0.0.1:8000/api/reviews"; // 기본 URL

      if (tag) {
        url += `/?tag=${tag}`; // 태그가 있으면 쿼리스트링 추가
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("네트워크 응답이 정상이 아닙니다.");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        // 첫 번째 경우: 전체가 문자열 리스트인 경우
        if (data.every(item => typeof item === "string")) {
          setComments(data);
          setRatings([]);  // 평점 리스트는 비움
        }
        // 두 번째 경우: (문자열 리스트, 숫자 리스트) 튜플인 경우
        else if (
          data.length === 2 &&
          Array.isArray(data[0]) && 
          Array.isArray(data[1])
        ) {
          setComments(data[0]);
          setRatings(data[1]);
        } 
        else {
          // 예외 케이스: 우리가 예상하지 않은 형태라면
          console.error("예상치 못한 데이터 구조:", data);
          setComments([]);
          setRatings([]);
        }
      } else {
        // data가 배열이 아닌 경우도 예외 처리
        console.error("예상치 못한 데이터 구조:", data);
        setComments([]);
        setRatings([]);
      }

    } catch (error) {
      console.error("리뷰 데이터 가져오기 실패:", error);
      setComments([]);
      setRatings([]);
    }
  };

  // ✅ 처음 페이지 로드 시 전체 리뷰 불러오기
  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ 태그 버튼 클릭 시 필터링된 데이터 요청
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    fetchReviews(tag);
  };

  // ✅ 평점을 문자열로 변환하는 함수
  const getRating = (rating) => `평점: ${rating.toFixed(1)}`;

  return (
    <div className="review-container">
      {/* 헤더 (고정) */}
      <header className="review-header">
        <div className="review-header-content">
          <img
            src="/reviewicons/back.png"
            alt="뒤로가기"
            className="review-back-icon"
            onClick={() => navigate(-1)}
          />
          <h1>후기</h1>
        </div>
      </header>

      {/* 태그 필터 버튼 */}
      <div className="review-tags">
        <button className="review-tag" onClick={() => handleTagClick(null)}>
          전체
        </button>
        <button className="review-tag" onClick={() => handleTagClick("interaction")}>
          소통 원활성
        </button>
        <button className="review-tag" onClick={() => handleTagClick("clean")}>
          청결도
        </button>
        <button className="review-tag" onClick={() => handleTagClick("situation_shared")}>
          상황 공유
        </button>
      </div>

      {/* 리뷰 리스트 */}
      <div className="review-scrollable-container">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className="review-card" key={index}>
              <div className="review-content-box">
                {/* 댓글 내용 표시 */}
                <p>{comment}</p>
                {/* 평점 표시 (ratings가 있을 경우) */}
                {ratings.length > 0 && ratings[index] !== undefined && (
                  <p>평점: {ratings[index].toFixed(1)}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-reviews">해당 태그의 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Review;
