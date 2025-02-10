import "./Login.css"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

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

        <form className="login-form">
          <div className="login-form-group">
            <input type="text" id="username" placeholder="아이디" className="login-input" />
          </div>

          <div className="login-form-group">
            <input type="password" id="password" placeholder="비밀번호" className="login-input" />
          </div>

          <button type="submit" className="login-login-button" onClick={() => navigate("/")}>
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
  )
}

export default Login

