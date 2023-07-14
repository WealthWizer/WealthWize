import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navbar.js";
import Budget from "./Budget.js";
import Goals from "./Goals.js";
import Sidebar from "./Sidebar.js";
import Transactions from "./Transactions.js";
import Overview from "./Overview.js";
import "./dashboard.css";
import { AuthContext } from "../authContext";

const Dashboard = ({ username }) => {

  const auth = useContext(AuthContext);
  console.log(" here is the token", auth);


  //declare states
  const [dataTables, setDataTables] = useState({});

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // console.log("hello from useEffect");
        const response = await fetch("http://localhost:3000/dashboard", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const jsonData = await response.json();
        console.log("here is the jsonDATA", jsonData);
        // console.log('jsonData', jsonData.savings)
        setDataTables({ ...jsonData });
      } catch (error) {
        console.log("error at fetchTables: ", error);
      }
    };
    fetchTables();
    // console.log('setTablessworked', dataTables);
  }, []);
  // console.log('setTablessworked', dataTables);

  return (
    <div className="dashboard">
      <Navbar username={username} />
      <Overview dataTables={dataTables} setDataTables={setDataTables} />
      <Transactions dataTables={dataTables} setDataTables={setDataTables} />
      <Budget dataTables={dataTables} setDataTables={setDataTables} />
      <Goals dataTables={dataTables} setDataTables={setDataTables} />
      {/* <button id="sidebar buttons"> button name</button> */}
      {/* <Sidebar dataTables={dataTables} setDataTables={setDataTables} /> */}
    </div>
  );
};

export default Dashboard;
