import React, { useState, useContext } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../authContext";

//migrate to redux
import { login } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  // const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/users/signup",
      {
        name: `${event.target.firstName.value} ${event.target.lastName.value}`,
        username: event.target.username.value,
        password: event.target.password.value,
      }
    );
    if (response.data.token) {
      // auth.login(
      //   response.data.token,
      //   response.data.username,
      //   response.data.userID
      // );
      dispatch(() => login(response.data));
      navigate("/dashboard");
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
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-title">Join Us</div>
          <div className="login-inputs">
            <div className="first-last">
              <input placeholder="First Name" name="firstName" />
              <input placeholder="Last Name" name="lastName" />
            </div>

            <input placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
          </div>

          <div>
            Already saving?{" "}
            <span
              className="bold"
              onClick={() => {
                navigate("/");
              }}
            >
              Log in here
            </span>
          </div>
          <button className="login-signup-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
