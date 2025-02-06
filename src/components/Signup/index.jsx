import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    navigate("/Signup2Page"); // /Signup2 페이지로 이동
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <button className="signup-back-button">←</button>
        <div className="signup-logo">ㄷㄹㄷ</div>
      </div>

      <div className="signup-content">
        <h1 className="signup-title">아이디와 비밀번호를 입력하시오</h1>

        <form className="signup-form" onSubmit={handleNext}>
          <div className="signup-form-group">
            <input type="text" id="username" placeholder="아이디" className="login-input" required />
          </div>

          <div className="signup-form-group">
            <input type="password" id="password" placeholder="비밀번호" className="login-input" required />
          </div>

          <div className="signup-form-group">
            <input type="password" id="confirm-password" placeholder="비밀번호 확인" className="login-input" required />
          </div>

          <button type="submit" className="signup-button">
            다음으로
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
