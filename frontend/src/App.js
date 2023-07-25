import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import "./index.css";

import { logout, login, checkSession } from "./reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { sessionValid } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionValid) {
      dispatch(logout());
      navigate("/");
    }
  }, [sessionValid]);

  // check session authentication status whenever the dom updates
  useEffect(() => {
    dispatch(checkSession());
  });

  return (
    <>
      {/* <AuthContext.Provider value={{ token, login, logout, userID, username }}> */}
      {/* <BrowserRouter> */}
      <Routes>
        {sessionValid && <Route path="/dashboard" element={<Dashboard />} />}
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </>
      </Routes>
      {/* </BrowserRouter> */}
      {/* </AuthContext.Provider> */}
    </>
  );
}

export default App;
