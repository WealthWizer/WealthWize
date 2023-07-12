import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navbar.js";
import Budget from "./Budget.js";
import Goals from "./Goals.js";
import Sidebar from "./Sidebar.js";
import Transactions from "./Transactions.js";
import Overview from "./Overview.js";
import "./dashboard.css";
import { AuthContext } from "../authContext.js";

const Dashboard = ({ username, setIsLoggedIn }) => {
  const auth = useContext(AuthContext);
  // const useID=auth.userID;

  //declare states
  const [dataTables, setDataTables] = useState({});

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const jsonData = await response.json();
        // console.log('jsonData', jsonData.savings)
        setDataTables({ ...jsonData });
      } catch (error) {
        console.log("error at fetchTables: ", error);
      }
    };
    fetchTables();
    console.log("setTablessworked", dataTables);
  }, []);

  return (
    <div className="dashboard">
      <Navbar
        className="Navbar"
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Overview
        className="Overview"
        dataTables={dataTables}
        setDataTables={setDataTables}
      />
      <Transactions
        className="Transactions"
        dataTables={dataTables}
        setDataTables={setDataTables}
      />
      <Budget
        className="Budget"
        dataTables={dataTables}
        setDataTables={setDataTables}
      />
      <Goals
        className="Goals"
        dataTables={dataTables}
        setDataTables={setDataTables}
      />
      <button id="sidebar buttons"> button name</button>
      <Sidebar
        className="Sidebar"
        dataTables={dataTables}
        setDataTables={setDataTables}
      />
    </div>
  );
};

export default Dashboard;
