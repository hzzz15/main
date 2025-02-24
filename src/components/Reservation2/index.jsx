"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import "./Reservation2.css"

function Reservation2() {
  const [profileImage, setProfileImage] = useState(null)
  const [petInfo, setPetInfo] = useState({
    name: "",
    pet_mbti: ""
  })

  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError) {
          console.error("사용자 정보 조회 에러:", userError)
          return
        }

        if (!user) {
          console.log("로그인된 사용자가 없습니다.")
          return
        }

        const { data: petData, error: petError } = await supabase
          .from("pets")
          .select("*")
          .eq("uuid_id", user.id)
          .maybeSingle()

        if (petError) {
          console.error("반려견 데이터 조회 에러:", petError)
          return
        }

        if (petData) {
          setProfileImage(petData.image_url)
          setPetInfo({
            name: petData.name || "",
            pet_mbti: petData.pet_mbti || ""
          })
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error)
      }
    }

    fetchPetProfile()
  }, [])

  return (
    <div className="reservation2-container">
      <header className="reservation2-header">
        <div className="reservation2-header-content">
          <h1>예약내역</h1>
          <div className="reservation2-header-buttons">
            <button className="reservation2-header-button active">진행 예약</button>
            <Link
              to="/LastPage"
              className="reservation2-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>

      <div className="reservation2-match-content">
        <div className="reservation2-match-card">
          <div className="reservation2-match-date">0000년 00월 00일</div>
          <div className="reservation2-match-status">매칭 완료!</div>
          <div className="reservation2-match-players">
            <div className="reservation2-player">
              <div className="reservation2-player-avatar">
                {profileImage ? (
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="반려견 프로필"
                    className="reservation2-avatar-image"
                    onError={(e) => {
                      console.error("이미지 로드 실패:", profileImage)
                      e.target.src = "/placeholder.svg"
                      setProfileImage(null)
                    }}
                  />
                ) : (
                  <div className="reservation2-avatar-placeholder">
                    <span>프로필 없음</span>
                  </div>
                )}
              </div>
              <div className="reservation2-player-name">{petInfo.name || "이름"}</div>
              <div className="reservation2-player-detail">
                {petInfo.pet_mbti ? `멍BTI : ${petInfo.pet_mbti}` : "멍BTI 미등록"}
              </div>
            </div>
            <div className="reservation2-match-image">
              <img src="/reservationicons/matching.png" alt="Matched" className="reservation2-match-icon" />
            </div>
            <div className="reservation2-trainer">
              <div className="reservation2-trainer-avatar">
                <img src="/trainerprofile/trainer.jpg" alt="트레이너" className="reservation2-trainer-image" />
              </div>
              <div className="reservation2-trainer-name">트레이너</div>
              <div className="reservation2-trainer-detail">자격증</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation2