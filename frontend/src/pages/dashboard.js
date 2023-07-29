import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navbar.js";
import Budget from "./Budget.js";
import Goals from "./Goals.js";
import Sidebar from "./Sidebar.js";
import Transactions from "./Transactions.js";
import Overview from "./Overview.js";
import "./dashboard.css";
import PlusIcon from "../images/Icons/+.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchTables, setSidebar } from "../reducers/dashboardSlice.js";

//change propdrilling datatables
//change propdrilling setSidebar

const Dashboard = () => {
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("data"));
  const { username, userID, token } = userData;

  //declare states
  const [dataTables1, setDataTables] = useState({});
  // const [sidebar, setSidebar] = useState(false);
  // const [rerender, setRerender] = useState(false);
  const { sidebar, rerender, dataTables } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchTables());
  }, [sidebar]);
  return (
    <div className="dashboard">
      <Navbar />
      <Overview />
      <div className="components">
        <Transactions />
        <Budget />
        <Goals />
      </div>
      <button
        onClick={() => dispatch(setSidebar(!sidebar))}
        type="button"
        id="sidebar-button"
      >
        <PlusIcon />
      </button>
      {sidebar && <Sidebar setSidebar={setSidebar} />}
    </div>
  );
};

export default Dashboard;
