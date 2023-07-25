import React, { useState, useContext } from "react";
import "./goalForm.css";
import { AuthContext } from "../authContext";
import axios from "axios";

function GoalForm({ setSidebar }) {
  // const auth = useContext(AuthContext);
  // hardcoded for testing
  const auth = {
    userID: 2,
    username: 'shiyuliu',
    token: 'test'
  }
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault;
    try {
      console.log("this is the token", auth.token);
      console.log(goal, amount);
      const response = await axios.post(
        "http://localhost:3000/dashboard/savegoal",
        {
          user_id: auth.userID,
          goal,
          amount,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setSidebar(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  return (
    <form className="goalForm" onSubmit={handleSubmit}>
      <label>Add your goal</label>
      <input placeholder="Goal Title" onChange={handleGoalChange} />
      <input placeholder="Amount" onChange={handleAmountChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default GoalForm;
