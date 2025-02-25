"use client"

import { useState, useEffect } from "react"
import "./TrainerInformation.css"
import { supabase } from "../../lib/supabaseClient" // 경로는 실제 환경에 맞게 조정
import { v4 as uuidv4 } from "uuid"

export default function TrainerInformation() {
  const [name, setName] = useState("")
  const [mbti, setMbti] = useState("")
  const [experience, setExperience] = useState("")
  // 이미지 업로드 관련 상태
  const [trainerImage, setTrainerImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  // 기존 데이터 존재 여부
  const [existingTrainerId, setExistingTrainerId] = useState(null)
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true)

  // 컴포넌트 마운트 시 기존 트레이너 정보 불러오기
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        setIsLoading(true)

        // 로그인 유저 정보 확인
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          console.error("로그인이 필요합니다:", userError)
          return
        }

        // 기존 트레이너 정보 조회
        const { data: trainerData, error: trainerError } = await supabase
          .from("trainers")
          .select()
          .eq("uuid_id", user.id)
          .maybeSingle()

        if (trainerError) {
          console.error("트레이너 정보 조회 실패:", trainerError)
          return
        }

        // 기존 데이터가 있으면 폼에 채우기
        if (trainerData) {
          setExistingTrainerId(trainerData.id)
          setName(trainerData.name || "")
          setMbti(trainerData.trainer_mbti || "")
          setExperience(trainerData.experience?.toString() || "")

          // 이미지 URL이 있으면 미리보기 설정
          if (trainerData.trainer_image_url) {
            setPreviewImage(trainerData.trainer_image_url)
          }

          console.log("기존 트레이너 정보를 불러왔습니다:", trainerData)
        } else {
          console.log("등록된 트레이너 정보가 없습니다. 새로 등록해주세요.")
        }
      } catch (err) {
        console.error("데이터 불러오기 오류:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrainerData()
  }, [])

  // 이미지 선택 시 미리보기 설정
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 이미지 타입 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.")
      return
    }

    setTrainerImage(file)
    const objectUrl = URL.createObjectURL(file)
    setPreviewImage(objectUrl)
  }

  // Supabase에 이미지 업로드
  const uploadImageToSupabase = async (file, userId) => {
    if (!file) return null

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${userId}/${fileName}`

      // trainers_image 버킷에 업로드
      const { data, error } = await supabase.storage.from("trainers_image").upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        throw new Error(error.message)
      }

      // 업로드된 파일의 public URL 가져오기
      const { data: urlData } = supabase.storage.from("trainers_image").getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (err) {
      console.error("이미지 업로드 실패:", err.message)
      alert("이미지 업로드에 실패했습니다.")
      return null
    }
  }

  // 폼 제출 시 트레이너 정보 저장
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // 로그인 유저 정보 확인
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error("로그인이 필요합니다.")
      }

      // 이미지가 있다면 업로드 후 URL 획득
      let imageUrl = null
      if (trainerImage) {
        imageUrl = await uploadImageToSupabase(trainerImage, user.id)
      }

      // DB 저장할 데이터
      const trainerData = {
        uuid_id: user.id,
        name: name.trim(),
        trainer_mbti: mbti.trim(),
        experience: Number.parseInt(experience, 10) || 0,
      }

      // 이미지가 새로 업로드된 경우에만 URL 업데이트
      if (imageUrl) {
        trainerData.trainer_image_url = imageUrl
      }

      let result
      if (existingTrainerId) {
        // 이미 존재하면 업데이트
        result = await supabase.from("trainers").update(trainerData).eq("id", existingTrainerId).select()
        alert("트레이너 정보가 성공적으로 수정되었습니다!")
      } else {
        // 없으면 새로 생성
        result = await supabase.from("trainers").insert([trainerData]).select()
        // 생성 후 ID 저장
        if (result.data && result.data[0]) {
          setExistingTrainerId(result.data[0].id)
        }
        alert("트레이너 정보가 성공적으로 등록되었습니다!")
      }

      if (result.error) {
        throw result.error
      }

      console.log("저장된 데이터:", result.data)
      // 성공 시 Profile_TPage로 이동
      window.location.href = "/Profile_TPage"
    } catch (err) {
      console.error("트레이너 정보 저장 실패:", err)
      alert(err.message)
    }
  }

  return (
    <div className="trainerinformation-container">
      <header className="trainerinformation-header">
        <a href="/Profile_TPage" className="trainerinformation-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="trainerinformation-back-icon" />
        </a>

        {/** ▼ 사진 등록 영역: 클릭 시 file input 열림 ▼ */}
        <div
          className="trainerinformation-image-container"
          onClick={() => document.getElementById("trainerImageInput").click()}
        >
          <div className="trainerinformation-image">
            {previewImage ? (
              <img
                src={previewImage || "/placeholder.svg"}
                alt="미리보기"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <span className="trainerinformation-text">사진 등록</span>
            )}
          </div>
          {/* 실제 파일 선택 input (숨김) */}
          <input
            type="file"
            id="trainerImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </header>

      <div className="trainerinformation-content">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
            <p style={{ color: "#666" }}>정보를 불러오는 중...</p>
          </div>
        ) : (
          <form className="trainerinformation-form" onSubmit={handleSubmit}>
            <h2 className="trainerinformation-form-title">기본 사항</h2>

            <div className="trainerinformation-form-group">
              <label className="trainerinformation-label">이름</label>
              <input
                type="text"
                className="trainerinformation-form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className="trainerinformation-form-group">
              <label className="trainerinformation-label">MBTI</label>
              <input
                type="text"
                className="trainerinformation-form-input"
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                placeholder="MBTI를 입력하세요"
              />
            </div>

            <div className="trainerinformation-form-group">
              <label className="trainerinformation-label">경력</label>
              <input
                type="text"
                className="trainerinformation-form-input"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="경력을 입력하세요"
              />
            </div>

            <button type="submit" className="trainerinformation-submit-button">
              등록 완료
            </button>
          </form>
        )}
      </div>
    </div>
  )
}