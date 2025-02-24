"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import "./Reservation1.css"

function Reservation1() {
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
            pet_mbti: petData.pet_mbti || "" // DogInformation에서 등록한 멍BTI
          })
          console.log("가져온 멍BTI:", petData.pet_mbti) // 데이터 확인용 로그
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error)
      }
    }

    fetchPetProfile()
  }, [])

  return (
    <div className="reservation1-container">
      <header className="reservation1-header">
        <div className="reservation1-header-content">
          <h1>예약내역</h1>
          <div className="reservation1-header-buttons">
            <button className="reservation1-header-button active">진행 예약</button>
            <Link
              to="/LastPage"
              className="reservation1-header-button"
              style={{ background: "none", border: "none", textDecoration: "none" }}
            >
              지난 예약
            </Link>
          </div>
        </div>
      </header>

      <div className="reservation1-match-content">
        <div className="reservation1-match-card">
          <div className="reservation1-match-date">0000년 00월 00일</div>
          <div className="reservation1-match-status">매칭중...</div>
          <div className="reservation1-match-players">
            <div className="reservation1-player">
              <div className="reservation1-player-avatar">
                {profileImage ? (
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="반려견 프로필"
                    className="reservation1-avatar-image"
                    onError={(e) => {
                      console.error("이미지 로드 실패:", profileImage)
                      e.target.src = "/placeholder.svg"
                      setProfileImage(null)
                    }}
                  />
                ) : (
                  <div className="reservation1-avatar-placeholder">
                    <span>프로필 없음</span>
                  </div>
                )}
              </div>
              <div className="reservation1-player-name">{petInfo.name || "이름"}</div>
              <div className="reservation1-player-detail">
                {petInfo.pet_mbti ? `멍BTI : ${petInfo.pet_mbti}` : "멍BTI 미등록"}
              </div>
            </div>
            <div className="reservation1-match-image">
              <img src="/reservationicons/matching.png" alt="Matching" className="reservation1-match-icon" />
            </div>
            <div className="reservation1-trainer">
              <div className="reservation1-trainer-avatar">
                <div className="reservation1-question-mark">?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation1