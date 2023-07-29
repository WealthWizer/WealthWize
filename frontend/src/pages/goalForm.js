import React, { useState, useContext } from "react";
import "./goalForm.css";
import { AuthContext } from "../authContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../reducers/dashboardSlice.js";

function GoalForm() {
  const dispatch = useDispatch();
  // const auth = useContext(AuthContext);
  // hardcoded for testing
  const auth = {
    userID: 2,
    username: "shiyuliu",
    token: "test",
  };

  const { userID, username, token } = JSON.parse(localStorage.getItem("data"));

  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault;
    try {
      // console.log("this is the token", auth.token);
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
    dispatch(setSidebar(false));
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
