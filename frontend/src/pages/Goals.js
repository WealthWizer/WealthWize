import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApexDonut from "./donut";
import { AuthContext } from "../authContext.js";
import "./goals.css";
import FilterIcon from "../images/Icons/filter";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, reset } from "../reducers/goalSlice";
import Popup from "reactjs-popup";
import axios from "axios";

const Goals = () => {
  // const auth = useContext(AuthContext);
  // hardcoded for testing
  const auth = {
    userID: 2,
    username: "shiyuliu",
    token: "test",
  };
  const [goals, setGoals] = useState([]);
  const [dropDown, setDropDown] = useState();
  const [reachedGoal, setReachGoal] = useState(false);
  const [currentGoal, setCurrentGoal] = useState();
  const [newGoal, setNewGoal] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/savinggoals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        userID: auth.userID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data from goals post req: ", data);
        const goalsFromDB = [];
        data.forEach((element) => {
          const existingGoal = goalsFromDB.find(
            (goal) => goal.category === element.category
          );
          if (existingGoal) {
            existingGoal.total += element.amount;
          } else {
            goalsFromDB.push({
              category: element.category,
              total: element.amount,
              goal: element.goal,
            });
          }
        });
        // console.log('goalsFromDB: ', goalsFromDB)
        setGoals(goalsFromDB);
        setDropDown(goalsFromDB[0].category);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateGoal = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/dashboard/updateGoal",
        {
          userID: 2,
          category: dropDown,
          amount: newGoal,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeGoal = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/dashboard/removeGoal",
        {
          params: {
            userID: 2,
            category: dropDown,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (value) => {
    setDropDown(value);
  };

  // console.log('dropDown: ', dropDown)
  console.log("goals: ", goals);

  return (
    <div className="Goals">
      <div className="goal-header">
        <h1>Goal</h1>
        <select onChange={(e) => handleOnChange(e.target.value)}>
          {goals &&
            goals.map((goal) => {
              console.log("this is the GOAL", goal);
              return (
                <>
                  <option>{goal.category}</option>
                </>
              );
            })}
        </select>
        <span className="filterIcon">
          <FilterIcon />
        </span>
      </div>
      <div className="donut-div">
        <Popup trigger={<button>*</button>} position="right center">
          <h5>{dropDown}</h5>
          <label>
            New Goal:{" "}
            <input
              type="text"
              onChange={(e) => setNewGoal(e.target.value)}
            ></input>
          </label>
          <button onClick={updateGoal}>Update</button>
          <button onClick={removeGoal}>Remove</button>
        </Popup>
        <ApexDonut
          goals={goals}
          dropDown={dropDown}
          setReachGoal={setReachGoal}
        />
        {goals.map((goal) => {
          if (goal.category === dropDown) {
            return (
              <>
                <div className="donut-label">
                  <h1 id="donut-h1">${goal.goal}</h1>
                  {!reachedGoal && (
                    <p id="donut-p">
                      ${goal.goal - goal.total} to {goal.category}
                    </p>
                  )}
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};
export default Goals;
