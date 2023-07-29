import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import "./index.css";

import { logout } from "./reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { sessionValid } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //reads user data from local storage
    const userData = JSON.parse(localStorage.getItem("data"));

    //if the current pathname isn't the root directory and user data was deleted, navigate to root
    if (!userData && window.location.pathname !== "/") {
      console.log("navigated");
      navigate("/");
    }

    //if user data exists but has expired, then auto logout
    if (userData) {
      const expireTime = new Date(userData.expireTime);
      const expired = Date.now() > expireTime;
      ("session has expired, user has been logged out");
      if (expired) dispatch(logout());
    }
  });

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
