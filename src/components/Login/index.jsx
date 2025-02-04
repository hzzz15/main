import React from 'react';
import "./style.css"

function Login() {
  return (
    <div className="login-container">
      <div className="login-header">
        <button className="back-button">←</button>
        <div className="logo">ㄷㄹㄷ</div>
      </div>

      <div className="login-content">
        <h1 className="login-title">로그인 하시겠어요?</h1>

        <form className="login-form">
          <div className="form-group">
            <input type="text" id="username" placeholder="아이디" className="login-input" />
          </div>

          <div className="form-group">
            <input type="password" id="password" placeholder="비밀번호" className="login-input" />
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}



export default Login