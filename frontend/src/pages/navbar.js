import React, { useState, useContext } from "react";
import NotificationIcon from "../images/Icons/notification";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //read username from local storage
  const userData = JSON.parse(localStorage.getItem("data"));
  const { username } = userData;

  //once logged out, useEffect in App.js should redirect to root
  const handleLogout = () => {
    dispatch(logout());
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
