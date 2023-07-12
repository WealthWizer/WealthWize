import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/Signup";
import { AuthContext } from "./authContext";
import "./index.css";
import { use } from "bcrypt/promises";

function App() {
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");

  const login = (token, user, userID) => {
    setToken(token);
    setUsername(user);
    setUserID(userID);
    localStorage.setItem(
      "data",
      JSON.stringify({
        token: token,
      })
    );
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setUserID(null);
    localStorage.removeItem("data");
  };

  return (
    <>
      <AuthContext.Provider value={{ token, login, logout, userID, username }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard username={username} />}
            />
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
