import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";  // ✅ Supabase 추가

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, password: password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ FastAPI 로그인 성공:", data);

      // ✅ JWT 토큰 저장 (FastAPI에서 발급)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);

      // ✅ Supabase 세션 설정
      const { error } = await supabase.auth.setSession({
        access_token: data.token,  // FastAPI JWT를 Supabase 세션에 적용
        refresh_token: data.token, // 리프레시 토큰도 동일하게 적용
      });

      if (error) {
        console.error("❌ Supabase 세션 설정 실패:", error.message);
        alert("로그인 세션을 설정하는 데 실패했습니다.");
        return;
      }

      console.log("✅ Supabase 세션 설정 완료");
      alert("로그인 성공!");
      navigate("/"); // ✅ 로그인 후 이동할 페이지
    } else {
      alert("로그인 실패: " + data.detail);
    }
  };

  return (
    <div className="login-container" style={{ height: "100%", overflowY: "auto" }}>
      <div className="login-header">
        <a href="/" className="login-back-button">
          <img src="/icons/back.png" alt="뒤로가기" className="login-back-icon" />
        </a>
        <h1>
          <img src="/icons/logo.png" alt="로고" className="login-logo" />
        </h1>
      </div>

      <div className="login-content">
        <h1 className="login-title">로그인 하시겠어요?</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            <input
              type="text"
              id="username"
              placeholder="아이디"
              className="login-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-login-button">
            로그인
          </button>
        </form>

        <div className="login-signup-container">
          <a href="/SignupPage" className="login-signup-link">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
