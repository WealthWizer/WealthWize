import React, { useState, useContext, useEffect } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";
// import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//show before change to redux and after change to Redux
// import { setCredentials } from "../slices/authSlice";
import { changeUsername, changePassword, login } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

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

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          username,
          password,
        }
      );
      //what response object should look like
      // status: "success",
      //     token: generateToken(result),
      //     username: result.rows[0].username,
      //     userID: result.rows[0].id,

      console.log(response);

      if (response.data.token) {
        // if (response.token) {
        // auth.login(
        //   response.data.token,
        //   response.data.username,
        //   response.data.userID
        // );
        dispatch(() => login(response.data));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
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
