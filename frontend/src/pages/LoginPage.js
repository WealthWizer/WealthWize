import React from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page-container">
      <div
        className="image-box"
        style={{
          backgroundImage: `url(${landingImage})`,
        }}
      >
        <div className="website-title">WealthWize</div>
      </div>
      <div className="form-box">
        <div className="form">
          <div className="form-title">Start Saving</div>
          <div className="login-inputs">
            <input placeholder="Username" />
            <input placeholder="Password" />
          </div>

          <div>
            Not saving yet? <span className="bold">Sign up here</span>
          </div>
          <button className="login-btn">Log In</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
