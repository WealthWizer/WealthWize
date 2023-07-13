import React, { useState, useContext } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          username,
          password,
        }
      );
      if (response.data.token) {
        auth.login(
          response.data.token,
          response.data.username,
          response.data.userID
        );
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
