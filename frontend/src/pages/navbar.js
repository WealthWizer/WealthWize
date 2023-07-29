import React, { useState, useContext } from "react";
import NotificationIcon from "../images/Icons/notification";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "../index.css";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  // const auth = useContext(AuthContext);
  // hardcoded for testing
  const auth = {
    userID: 2,
    username: 'shiyuliu',
    token: 'test'
  }
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="logo">WealthWize</div>
      <div className="navbar-items">
        <NotificationIcon onClick={() => {}} />
        <div className="user">
          <div className="user-photo"></div>
          <p>{username}</p>
        </div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Navbar;
