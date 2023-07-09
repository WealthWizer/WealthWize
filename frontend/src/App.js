import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Signup from "./pages/signup";
import "./index.css";
import { use } from "bcrypt/promises";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isSignedUp, setisSignedUp]=useState(false);
  const [username, setUsername] = useState('user 1');

  //add authProvider later, might be unneccessary 
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard username={username} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
