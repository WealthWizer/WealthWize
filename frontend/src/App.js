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
  const [username, setUsername] = useState('user 1');

  const login = (token) => {
    setToken(token);
    localStorage.setItem(
      "data",
      JSON.stringify({
        token: token,
      })
    );
  };

  const logout = () => { };

  return (
    <>
      <AuthContext.Provider value={{ token, login, logout }}>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard username={username} />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>



  );
}

export default App;
