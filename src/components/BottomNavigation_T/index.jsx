"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./BottomNavigation_T.css"

function BottomNavigation_T() {
  const [activeItem, setActiveItem] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // 로그인 상태 확인 (토큰 키값 수정)
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("로그인 토큰:", token)
    setIsLoggedIn(!!token)
  }, [])

  const handleClick = (item) => {
    console.log("현재 로그인 상태:", isLoggedIn)

    if (!isLoggedIn) {
      console.log("로그인 필요! 인트로페이지로 이동")
      navigate("/IntroPage")
      return
    }

    setActiveItem(item)
    console.log(`${item} 클릭됨`)
    switch (item) {
      case "예약하기":
        navigate("/Main_TPage")
        break
      case "예약내역":
        navigate("/Reservation_TPage")
        break
      case "라이브":
        navigate("/Live_TPage")
        break
      case "발도장":
        navigate("/Like_TPage")
        break
      case "프로필":
        navigate("/Profile_TPage")
        break
      // 다른 항목들에 대한 라우팅도 여기에 추가할 수 있습니다.
    }
  }

  return (
    <div className="bottom-navigation">
      <div className={`nav-item ${activeItem === "예약하기" ? "active" : ""}`} onClick={() => handleClick("예약하기")}>
        <img src="/bottomnavigationicons/booking.png" alt="예약하기" className="nav-icon" />
        <span>예약하기</span>
      </div>
      <div className={`nav-item ${activeItem === "예약내역" ? "active" : ""}`} onClick={() => handleClick("예약내역")}>
        <img src="/bottomnavigationicons/history.png" alt="예약내역" className="nav-icon" />
        <span>예약내역</span>
      </div>
      <div className={`nav-item ${activeItem === "라이브" ? "active" : ""}`} onClick={() => handleClick("라이브")}>
        <img src="/bottomnavigationicons/live.png" alt="라이브" className="nav-icon" />
        <span>라이브</span>
      </div>
      <div className={`nav-item ${activeItem === "발도장" ? "active" : ""}`} onClick={() => handleClick("발도장")}>
        <img src="/bottomnavigationicons/paw.png" alt="발도장" className="nav-icon" />
        <span>발도장</span>
      </div>
      <div className={`nav-item ${activeItem === "프로필" ? "active" : ""}`} onClick={() => handleClick("프로필")}>
        <img src="/bottomnavigationicons/profile.png" alt="프로필" className="nav-icon" />
        <span>프로필</span>
      </div>
    </div>
  )
}

export default BottomNavigation_T

