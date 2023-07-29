import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navbar.js";
import Budget from "./Budget.js";
import Goals from "./Goals.js";
import Sidebar from "./Sidebar.js";
import Transactions from "./Transactions.js";
// import Stocks from "./Stocks.js";
import Overview from "./Overview.js";
import "./dashboard.css";
import { AuthContext } from "../authContext.js";
import PlusIcon from "../images/Icons/+.js";

const Dashboard = ({ username }) => {
  // hardcoded for testing
  const auth = {
    userID: 2,
    username: 'shiyuliu',
    token: 'test'
  }
  console.log("here is the token", auth);

  //declare states
  const [dataTables, setDataTables] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // console.log("hello from useEffect");
        const response = await fetch(`http://localhost:3000/dashboard/${auth.userID}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const jsonData = await response.json();
        // console.log("here is the jsonDATA", jsonData);
        // console.log('jsonData', jsonData.savings)
        console.log('jsonData: ', jsonData);
        setDataTables({ ...jsonData });
      } catch (error) {
        console.log("error at fetchTables: ", error);
      }
    };
    fetchTables();
    // console.log('setTablessworked', dataTables);
  },[]); //[sidebar]
  // console.log('setTablessworked', dataTables.budget);
  // console.log("sidebar: ", sidebar);
  console.log("from dashboard datatables", dataTables);
  return (
    <div className="dashboard">
      <Navbar username={username} />
      <Overview dataTables={dataTables} setDataTables={setDataTables} />
      <div className="components">
        {/* <Transactions dataTables={dataTables} setDataTables={setDataTables} />
        <Budget
          setSidebar={setSidebar}
          dataTables={dataTables}
          setDataTables={setDataTables}
        />
        <Goals dataTables={dataTables} setDataTables={setDataTables} /> */}
        {/* <Stocks dataTables={dataTables} setDataTables={setDataTables} /> */}
        <Transactions />
        <Budget />
        <Goals />
      </div>
      <button
        onClick={() => setSidebar((current) => !current)}
        type="button"
        id="sidebar-button"
      >
        <PlusIcon />
      </button>
      {sidebar && (
        <Sidebar
          setSidebar={setSidebar}
          dataTables={dataTables}
          setDataTables={setDataTables}
          setRerender={setRerender}
        />
      )}
    </div>
  );
};

export default Dashboard;
