import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./authContext";
import "./index.css";

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
        username: user,
        userID: userID,
      })
    );
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setUserID(null);
    localStorage.removeItem("data");
  };

  useEffect(() => {
    const lsData = JSON.parse(localStorage.getItem("data"));
    if (lsData && lsData.token) {
      login(lsData.token, lsData.username, lsData.userID);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ token, login, logout, userID, username }}>
        <BrowserRouter>
          <Routes>
            {token ? (
              <>
                <Route
                  path="/dashboard"
                  element={<Dashboard username={username} />}
                />
              </>
            ) : (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
