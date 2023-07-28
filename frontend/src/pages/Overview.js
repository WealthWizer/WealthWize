import React, { useState, useEffect, useContext } from "react";
import "./Overview.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

const Overview = ({ dataTables }) => {
  const [total, setTotal] = useState(null);
  const [accounts, setAccounts] = useState({ checking: 5000, savings: 0 });
  const [options, setOptions] = useState([]);
  const [goal, setGoal] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        let savingsTable = dataTables?.savings; // Null check using optional chaining
        let savingsSum = 0;
        console.log("savingstable:", savingsTable);

        savingsTable.forEach((row) => {
          savingsSum += row.amount;
        });
        setAccounts((prevAccounts) => ({
          ...prevAccounts,
          savings: savingsSum,
        }));
      } catch (err) {
        console.log("Error at Overview.js:", err);
      }
    };

    const fetchGoals = async () => {
      const goals = dataTables?.savings_goals;
      const categories = [];

      for (let i = 0; i < goals.length; i++) {
        categories.push(goals[i].category);
      }
      setOptions(categories);
      setGoal(categories[0]);
    };

    // fetchSavings();
    // fetchGoals();
  }, [dataTables]);

  useEffect(() => {
    if (accounts.checking !== null && accounts.savings !== null) {
      setTotal(accounts.checking + accounts.savings);
    }
  }, [accounts]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/dashboard/save",
        {
          userID: 2,
          category: goal,
          amount: amount,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Overview">
      <p>Total Amount: </p>
      <h1 className="total">${total}</h1>
      <div className="accounts">
        <div className="checkings_total">
          <p>Checking: </p>
          <span> ${accounts.checking}</span>
        </div>
        <div className="savings_total">
          <p>Savings: </p>
          <span> ${accounts.savings}</span>
          <Popup trigger={<button>+</button>} position="right center">
            <p>
              save $
              <input
                type="text"
                onChange={(e) => setAmount(e.target.value)}
              ></input>{" "}
              towards
            </p>
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              {options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
            <button onClick={handleSave}>save</button>
          </Popup>
        </div>
      </div>
    </div>
  );
};
export default Overview;
