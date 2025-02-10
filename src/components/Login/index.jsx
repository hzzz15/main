import "./Login.css"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  return (
    <div className="login-container" style={{height: '100%', overflowY: 'auto'}}>
      <div className="login-header">
        <button className="login-back-button">←</button>
        <div className="login-logo">ㄷㄹㄷ</div>
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
          <button type="button" className="login-signup-button" onClick={() => navigate("/SignupPage")}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

