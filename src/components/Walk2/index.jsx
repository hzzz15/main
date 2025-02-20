"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { geocodeByPlaceId } from "react-google-places-autocomplete"
import "./Walk2.css"

export default function Walk2() {
  const navigate = useNavigate()
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiKey, setApiKey] = useState("")
  const [contact, setContact] = useState("")
  const [inputError, setInputError] = useState("")

  useEffect(() => {
    if (!process.env.REACT_APP_GOOGLE_API_KEY) {
      console.error("🚨 Google API Key가 설정되지 않았습니다!")
      setError("Google API Key가 누락되었습니다.")
    } else {
      setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
      console.log("✅ Google API Key 로드됨")
    }
  }, [])

  const handlePlaceSelect = async (place) => {
    setSelectedPlace(place)
    setError(null)
    setInputError("")

    if (place && place.value && place.value.place_id) {
      try {
        const geoData = await geocodeByPlaceId(place.value.place_id)
        if (geoData.length > 0) {
          const location = geoData[0].geometry.location
          setCoordinates({ lat: location.lat(), lng: location.lng() })
        }
      } catch (error) {
        console.error("좌표 변환 오류:", error)
        setError("좌표 변환에 실패했습니다.")
      }
    }
  }

  const handleSubmit = async () => {
    if (!selectedPlace || !coordinates) {
      setInputError("주소를 입력하세요!")
      return
    }

    if (!contact) {
      setInputError("연락처를 입력하세요!")
      return
    }

    setInputError("")
    setLoading(true)
    setError(null)

    const requestData = {
      address: selectedPlace.label,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      contact: contact,
    }

    console.log("📤 서버로 보낼 데이터:", requestData)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/address/save-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`서버 오류: ${errorData.message || response.statusText}`)
      }

      const result = await response.json()
      console.log("서버 응답:", result)

      alert("✅ 주소가 정상적으로 저장되었습니다!")
      navigate("/Walk3Page")
    } catch (error) {
      console.error("주소 저장 실패:", error)
      setError(`주소 저장에 실패했습니다: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="Walk2-container">
      <div className="Walk2-white-section">
        <div className="Walk2-header">
          <button className="Walk2-back-button" onClick={() => navigate("/WalkPage")}>
            <img src="/icons/back.png" alt="뒤로가기" className="Walk2-back-icon" />
          </button>
          <h1 className="Walk2-title">
            어디로
            <br />
            방문하면 될까요?
          </h1>
        </div>
        <div className="Walk2-input-group">
          <label htmlFor="address" className="Walk2-input-label">
            주소
          </label>
          {apiKey ? (
            <GooglePlacesAutocomplete
              apiKey={apiKey}
              selectProps={{
                value: selectedPlace,
                onChange: handlePlaceSelect,
                placeholder: "주소를 입력해주세요",
                className: "Walk2-input-field",
              }}
            />
          ) : (
            <p style={{ color: "red" }}>⚠️ Google API Key가 설정되지 않았습니다.</p>
          )}

          <label htmlFor="contact" className="Walk2-input-label">
            연락처
          </label>
          <input
            type="text"
            id="contact"
            className="Walk2-input-field"
            placeholder="연락처를 입력해주세요"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value)
              setInputError("")
            }}
          />
        </div>
      </div>

      <div className="Walk2-qa-section">
        <h2 className="Walk2-qa-title">Q. 예약이 불가능한 주소라고 떠요</h2>
        <p className="Walk2-qa-content">
          현재 고객님께서 계신 지역은 아쉽게도 아직 서비스
          <br />
          가능 지역에 포함되지 않아 서비스 이용이 어렵습니다.
        </p>
      </div>

      <div className="Walk2-bottom-section">
        {(inputError || error) && (
          <div className={`Walk2-error-message ${inputError ? "Walk2-input-error" : ""}`}>{inputError || error}</div>
        )}
        <div className="Walk2-bottom-content">
          <p className="Walk2-confirm-text">
            방문 주소를
            <br />
            확인해주세요
          </p>
          <button className="Walk2-next-button" onClick={handleSubmit} disabled={loading}>
            {loading ? "저장 중..." : "다음으로"}
          </button>
        </div>
      </div>
    </div>
  )
}

