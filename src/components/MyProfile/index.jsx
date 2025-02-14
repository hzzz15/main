import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "./MyProfile.css";

function MyProfile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserInfo(storedUserId);
    }
  }, []);

  const fetchUserInfo = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("phone_number, address, email")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user info:", error);
    } else if (data) {
      setPhoneNumber(data.phone_number || '');
      setAddress(data.address || '');
      setEmail(data.email || '');
    }
  };

  const handleBackClick = () => {
    navigate("/ProfilePage");
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const togglePhoneEdit = () => {
    setIsPhoneEditable(!isPhoneEditable);
  };

  const toggleAddressEdit = () => {
    setIsAddressEditable(!isAddressEditable);
  };

  const toggleEmailEdit = () => {
    setIsEmailEditable(!isEmailEditable);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        phone_number: phoneNumber,
        address: address,
        email: email,
      })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user info:", error);
      alert("정보 업데이트에 실패했습니다.");
    } else {
      alert("정보가 성공적으로 업데이트되었습니다.");
      setIsPhoneEditable(false);
      setIsAddressEditable(false);
      setIsEmailEditable(false);
    }
  };

  return (
    <div className="myprofile-container" style={{ height: "100%", overflowY: "auto" }}>
      {/* 헤더 (고정) */}
      <header className="myprofile-header">
        <div className="myprofile-header-content">
          <img src="/icons/back.png" alt="뒤로가기" className="myprofile-back-icon" onClick={handleBackClick} />
          <div className="myprofile-title-container">
            <h1>
              {userId}님,
              <br />
              안녕하세요!
            </h1>
            <img src="/dogprofile/dog.jpg" alt="프로필 아바타" className="myprofile-avatar-icon" />
          </div>
        </div>
      </header>

      {/* 스크롤 가능한 컨테이너 */}
      <div className="myprofile-scrollable-container">
        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">아이디</span>
            <div className="myprofile-input-button-container">
              <input type="text" className="myprofile-input" value={userId} readOnly />
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">휴대폰 번호</span>
            <div className="myprofile-input-button-container">
              <input 
                type="tel" 
                className="myprofile-input" 
                value={phoneNumber} 
                onChange={handlePhoneChange}
                readOnly={!isPhoneEditable}
              />
              <button className="myprofile-change-button" onClick={togglePhoneEdit}>
                {isPhoneEditable ? '취소' : '번호변경'}
              </button>
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">내 주소</span>
            <div className="myprofile-input-button-container">
              <input 
                type="text" 
                className="myprofile-input" 
                value={address} 
                onChange={handleAddressChange}
                readOnly={!isAddressEditable}
              />
              <button className="myprofile-change-button" onClick={toggleAddressEdit}>
                {isAddressEditable ? '취소' : '주소변경'}
              </button>
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">이메일</span>
            <div className="myprofile-input-button-container">
              <input 
                type="email" 
                className="myprofile-input" 
                value={email} 
                onChange={handleEmailChange}
                readOnly={!isEmailEditable}
              />
              <button className="myprofile-change-button" onClick={toggleEmailEdit}>
                {isEmailEditable ? '취소' : '이메일변경'}
              </button>
            </div>
          </div>
        </div>

        <button className="myprofile-save-button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
}

export default MyProfile;