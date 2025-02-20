"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup2.css";

export default function Signup2() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    // ✅ localStorage에서 데이터 불러오기
    useEffect(() => {
        const storedData = localStorage.getItem("signupData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserId(parsedData.user_id);
            setPassword(parsedData.password);
            setNickname(parsedData.nickname);
            setName(parsedData.name);
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
    
        const response = await fetch("http://localhost:8000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                password: password,
                email: email,
                name: name,
                phone_number: phoneNumber, // ✅ 올바른 변수명
                address: address, // ✅ 올바른 변수명
                nickname: nickname, // ✅ 올바른 변수명
            }),
            mode:"cors",
        });
    
        const data = await response.json();
    
        if (response.ok) {
            alert("회원가입 성공! 로그인 해주세요.");
            localStorage.removeItem("signupData"); // ✅ 회원가입 완료 후 localStorage에서 데이터 삭제
            navigate("/LoginPage");
        } else {
            alert("회원가입 실패: " + data.detail);
        }
    };
    

    return (
        <div className="signup2-container" style={{ height: "100%", overflowY: "auto" }}>
            <div className="signup2-header">
                <a href="/SignupPage" className="signup2-back-button">
                    <img src="/icons/back.png" alt="뒤로가기" className="signup2-back-icon" />
                </a>
                <h1>
                    <img src="/icons/logo.png" alt="로고" className="signup2-logo" />
                </h1>
            </div>

            <div className="signup2-content">
                <h1 className="signup2-title">전화번호, 주소, 이메일을 입력하시오</h1>

                <form className="signup2-form" onSubmit={handleSignup}>
                    <div className="signup2-form-group">
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                               placeholder="전화번호" className="signup2-tel-input" required />
                    </div>

                    <div className="signup2-form-group">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                               placeholder="내 주소" className="signup2-address-input" required />
                    </div>

                    <div className="signup2-form-group">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               placeholder="이메일" className="signup2-email-input" required />
                    </div>

                    <button type="submit" className="signup2-button">
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}
