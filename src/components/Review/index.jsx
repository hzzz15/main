"use client";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ReviewCard from "./ReviewCard";
import "./Review.css";

function Review() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  // 백엔드 API 호출 함수
  const fetchReviews = useCallback(async (tag = null) => {
    try {
      let url = "http://127.0.0.1:8000/api/reviews"; // 기본 URL

      if (tag) {
        url += `/?tag=${tag}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("네트워크 응답이 정상이 아닙니다.");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        // 전체가 문자열 리스트인 경우
        if (data.every((item) => typeof item === "string")) {
          setComments(data);
          setRatings([]);
        }
        // (문자열 리스트, 숫자 리스트) 튜플인 경우
        else if (
          data.length === 2 &&
          Array.isArray(data[0]) &&
          Array.isArray(data[1])
        ) {
          setComments(data[0]);
          setRatings(data[1]);
        } else {
          console.error("예상치 못한 데이터 구조:", data);
          setComments([]);
          setRatings([]);
        }
      } else {
        console.error("예상치 못한 데이터 구조:", data);
        setComments([]);
        setRatings([]);
      }
    } catch (error) {
      console.error("리뷰 데이터 가져오기 실패:", error);
      setComments([]);
      setRatings([]);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    fetchReviews(tag);
  };

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
        <button
          className={`review-tag ${selectedTag === null ? "active" : ""}`}
          onClick={() => handleTagClick(null)}
        >
          전체
        </button>
        <button
          className={`review-tag ${selectedTag === "interaction" ? "active" : ""}`}
          onClick={() => handleTagClick("interaction")}
        >
          소통 원활성
        </button>
        <button
          className={`review-tag ${selectedTag === "clean" ? "active" : ""}`}
          onClick={() => handleTagClick("clean")}
        >
          청결도
        </button>
        <button
          className={`review-tag ${selectedTag === "situation_shared" ? "active" : ""}`}
          onClick={() => handleTagClick("situation_shared")}
        >
          상황 공유
        </button>
      </div>

      {/* 리뷰 리스트: 모든 렌더링 로직은 ReviewCard로 위임 */}
      <div className="review-scrollable-container">
        <ReviewCard comments={comments} ratings={ratings} />
      </div>
    </div>
  );
}

export default Review;
