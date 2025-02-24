"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"
import "./Profile.css"

function Profile() {
  const [profileImage, setProfileImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        setIsLoading(true)

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.error("사용자 정보 조회 에러:", userError.message)
          return
        }

        if (!user) {
          console.log("로그인된 사용자가 없습니다.")
          return
        }

        const { data: petData, error: petError } = await supabase
          .from("pets")
          .select("image_url")
          .eq("uuid_id", user.id)
          .maybeSingle()

        if (petError) {
          console.error("반려견 데이터 조회 에러:", petError.message)
          return
        }

        if (petData?.image_url) {
          setProfileImage(petData.image_url)
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPetProfile()
  }, [])

  return (
    <div className="profile-container" style={{ minHeight: "100%", overflowY: "auto" }}>
      <header className="profile-header">
        <div className="profile-header-top">
          <h1>더보기</h1>
          <a href="/MyProfilePage" className="profile-link">
            내 프로필
          </a>
        </div>
        <div className="profile-header-bottom">
          <a href="/DogInformationPage" className="profile-link-container">
            <div className="profile-avatar">
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="프로필 이미지"
                  onError={(e) => {
                    console.error("이미지 로드 실패:", profileImage)
                    e.target.style.display = "none"
                  }}
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  <span>프로필 등록</span>
                </div>
              )}
            </div>
            <div className="profile-details">
              <span>반려동물 프로필</span>
              <img src="/profileicons/arrow-right.png" alt="화살표" className="profile-arrow-icon" />
            </div>
          </a>
        </div>
      </header>

      <a href="/ResultLastPage" className="profile-report">
        <div className="profile-report-card">
          <img src="/profileicons/report.png" alt="리포트 아이콘" />
          <span>지난 산책 리포트</span>
        </div>
      </a>
      <a href="/Main_TPage" className="profile-footer">
        <span className="profile-trainer-mode-text">트레이너 모드로 전환</span>
        <img src="/profileicons/switch.png" alt="전환 아이콘" className="profile-trainer-mode-icon" />
      </a>
    </div>
  )
}

export default Profile

