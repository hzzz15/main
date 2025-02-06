import "./Signup2.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    navigate("/LoginPage");
  };

  return (
    <div className="signup2-container">
      <div className="signup2-header">
        <button className="signup2-back-button">←</button>
        <div className="signup2-logo">ㄷㄹㄷ</div>
      </div>

      <div className="signup2-content">
        <h1 className="signup2-title">전화번호와 주소를 입력하시오</h1>

        <form className="signup2-form" onSubmit={handleNext}>
          <div className="signup2-form-group">
            <input type="text" id="usertel" placeholder="전화번호" className="signup2-tel-input" required />
          </div>

          <div className="signup2-form-group">
            <input type="text" id="useraddress" placeholder="내 주소" className="signup2-address-input" required />
          </div>

          <button type="submit" className="signup2-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
