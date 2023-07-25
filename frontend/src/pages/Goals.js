import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import ApexDonut from "./donut";
import { AuthContext } from "../authContext.js";
import "./goals.css";
import FilterIcon from "../images/Icons/filter";
import { useSelector, useDispatch } from 'react-redux';
import { getGoals, reset } from "../reducers/goalSlice";


const Goals = () => {
  const auth = useContext(AuthContext);
  // const [goals, setGoals] = useState([]); commented out for redux implementation
  const [dropDown, setDropDown] = useState();
  const [reachedGoal, setReachGoal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //redux slice
  const { goals, isError, isLoading, message } = useSelector((state) => state.goals)

  useEffect(() => {
//start the redux here
    if(isError) {
      console.log(message)
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset())
    }
    //we won't need this fetch once the redux dispatches are set up

    fetch("http://localhost:3000/dashboard/savinggoals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        // userID: auth.userID
        userID: 1,
      }),
    })
      .then((response) => response.json())

//get the data back from the slice here

      .then((data) => {
        console.log("data from goals post req: ", data);

        //use this to render the goals from state onto the page
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
  }, [user, navigate, isError, message, dispatch]);

  const handleOnChange = (value) => {
    setDropDown(value);
  };

  // console.log('dropDown: ', dropDown)
  // console.log('goals: ', goals)

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
