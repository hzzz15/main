"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./BottomNavigation.css"
import { supabase } from "../../lib/supabaseClient";


function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ 로그인 상태 확인 (Supabase 세션 기반)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("🚨 세션 가져오기 실패:", error.message);
        setIsLoggedIn(false);
        return;
      }

      if (session) {
        console.log("✅ 로그인된 사용자 정보:", session.user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);
  
  const handleClick = (item) => {
    console.log("현재 로그인 상태:", isLoggedIn); // 🔥 디버깅용 로그

    if (!isLoggedIn) {
      console.log("로그인 필요! 인트로 페이지로 이동");
      navigate("/IntroPage");
      return;
    }

    switch (item) {
      case "예약하기":
        navigate("/")
        break
      case "예약내역":
        navigate("/ReservationPage")
        break
      case "라이브":
        navigate("/LivePage")
        break
      case "발도장":
        navigate("/LikePage")
        break
      case "프로필":
        navigate("/ProfilePage")
        break
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

export default BottomNavigation

