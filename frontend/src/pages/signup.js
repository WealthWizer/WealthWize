import React, { useState } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";

const Signup = () => {
  return (
    <div className="login-signup-page-container">
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
          <div className="form-title">Join Us</div>
          <div className="login-inputs">
            <div className="first-last">
              <input placeholder="First Name" />
              <input placeholder="Last Name" />
            </div>

            <input placeholder="Username" />
            <input placeholder="Password" />
          </div>

          <div>
            Already saving? <span className="bold">Log in here</span>
          </div>
          <button className="login-signup-btn">Sign up</button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
