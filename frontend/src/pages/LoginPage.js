import React, { useState, useContext, useEffect } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";
// import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//show before change to redux and after change to Redux
import { useDispatch, useSelector } from "react-redux";
import { changeUsername, changePassword, login } from "../reducers/authSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sessionValid } = useSelector((state) => state.auth);

  const handleUsernameChange = (event) => {
    dispatch(changeUsername(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(changePassword(event.target.value));
  };

  //if the handleLoginSubmit is successful, then redirect to next page
  useEffect(() => {
    if (sessionValid) navigate("/dashboard");
  });

  //on login button click, this will fire to the auth slice
  const handleLoginSubmit = async () => {
    dispatch(login());
  };

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
          <div className="form-title">Start Saving</div>
          <div className="login-inputs">
            <input placeholder="Username" onChange={handleUsernameChange} />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            Not saving yet?{" "}
            <span
              className="bold"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up here
            </span>
          </div>
          <button className="login-signup-btn" onClick={handleLoginSubmit}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
