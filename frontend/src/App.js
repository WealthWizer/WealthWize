import React,{useState} from "react";
import LoginPage from "./pages/LoginPage";
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Signup from "./pages/signup";
import "./index.css";
function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  // const [isSignedUp, setisSignedUp]=useState(false);

  //add authProvider later, might be unneccessary 
  return (
<>
<BrowserRouter>
      <Routes>

      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
</BrowserRouter>
</>
 
  );
}

export default App;
