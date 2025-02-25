"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import "./Walk5.css"

export default function Walk5() {
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null)
  const [petInfo, setPetInfo] = useState({
    name: "",
    size: "",
    birth_date: "",
    gender: ""
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
            size: petData.size || "",
            birth_date: petData.birth_date || "",
            gender: petData.gender === "female" ? "여아" : "남아"
          })
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error)
      }
    }

    fetchPetProfile()
  }, [])

  // 나이 계산 함수 수정
  const calculateAge = (birthDate) => {
    if (!birthDate) return ""
    
    const today = new Date()
    const birth = new Date(birthDate)
    
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()

    // 월이 음수인 경우 처리
    if (months < 0) {
      years--
      months += 12
    }

    // 일자 비교로 월 조정
    if (today.getDate() < birth.getDate()) {
      months--
      if (months < 0) {
        years--
        months += 12
      }
    }

    // 년과 개월 표시 로직
    if (years > 0) {
      if (months > 0) {
        return `${years}년 ${months}개월`
      }
      return `${years}년`
    }
    return `${months}개월`
  }

  return (
    <div className="Walk5-container">
      <div className="Walk5-header">
        <button className="Walk5-back-button" onClick={() => navigate("/Walk4Page")}>
          <img src="/icons/back.png" alt="뒤로가기" className="Walk5-back-icon" />
        </button>
        <h1 className="Walk5-title">
          반려동물에 대해
          <br />
          알려주세요
        </h1>
      </div>

      <div className="Walk5-content">
        <div className="Walk5-profile-card">
          <div className="Walk5-profile-image">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="반려동물 프로필"
                onError={(e) => {
                  console.error("이미지 로드 실패:", profileImage)
                  e.target.src = "/placeholder.svg"
                  setProfileImage(null)
                }}
              />
            ) : (
              <div className="Walk5-profile-placeholder">
                <span>프로필 없음</span>
              </div>
            )}
          </div>
          <div className="Walk5-profile-info">
            <div className="Walk5-name">{petInfo.name || "이름"}</div>
            <div className="Walk5-details">
              {`${petInfo.size || "사이즈"}\n${petInfo.gender || "성별"} · ${calculateAge(petInfo.birth_date) || "나이"}`}
            </div>
          </div>
          <button className="Walk5-edit-button">
            <input type="checkbox" className="Walk5-checkbox" defaultChecked />
          </button>
        </div>

        <div className="Walk5-request-section">
          <h2 className="Walk5-section-title">요청사항</h2>
          <textarea className="Walk5-request-input" placeholder="요청사항을 꼼꼼하게 적어주세요!" rows={6}></textarea>
        </div>
            {/* ✅ 추가된 안내 문구 */}
            <div className="Walk5-info-box">
                <p className="Walk5-info-title">📢 강아지 인식표 착용했나요?</p>
                <p className="Walk5-info-text">
                  반려견의 안전을 위해 인식표 착용은 필수입니다.
                  인식표를 착용하지 않은 강아지는 산책이 불가능하며, 이를 어기고 산책 중 발생한 사고에 대한 책임은 보호자에게 있습니다.
                </p>
              </div>
            </div>

      <div className="Walk5-bottom-section">
        <button className="Walk5-next-button" onClick={() => navigate("/Reservation1Page")}>
          다음으로
        </button>
      </div>
    </div>
  )
}