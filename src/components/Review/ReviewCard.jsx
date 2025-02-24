import React from "react";
import "./Review.css";

function ReviewCard({ comments, ratings }) {
  // 리뷰 데이터가 없으면 메시지 출력
  if (!comments || comments.length === 0) {
    return <p className="no-reviews">해당 태그의 리뷰가 없습니다.</p>;
  }

  return (
    <>
      {comments.map((comment, index) => (
        <div className="review-card" key={index}>
          <div className="review-content-box">
            <p>{comment}</p>
            {ratings && ratings.length > 0 && ratings[index] !== undefined && (
              <p>평점: {ratings[index].toFixed(1)}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default ReviewCard;
