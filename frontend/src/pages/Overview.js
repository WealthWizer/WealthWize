import React, { useState,useEffect, useContext } from 'react';
import './Overview.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

const Overview =({dataTables})=>{

const [total, setTotal] = useState(null);
const [accounts, setAccounts] = useState({checking: 5000, savings: 0});
const [options, setOptions] = useState([]);
const [goal, setGoal] = useState();
const [amount, setAmount] = useState();
const [goalAchieved, setGoalAchieved] = useState(false);
const auth = {
  userID: 2,
  username: 'shiyuliu',
  token: 'test'
}

    useEffect(() => {
        const fetchSavings = async () => {
          try {
            let savingsTable = dataTables?.savings; // Null check using optional chaining
            let savingsSum = 0;
            // console.log('savingsTable', savingsTable)

            savingsTable.forEach((row) => {
              savingsSum += row.amount;
            });
            setAccounts((prevAccounts) => ({
              ...prevAccounts,
              savings: savingsSum,
            }));
          } catch (err) {
            console.log('Error at Overview.js:', err);
          }
        };
    
      fetchSavings();
      }, [dataTables]);

    useEffect(() => {
    const fetchGoals = async () => {
      // let goals = dataTables?.savings_goals;
      const data = await fetch(`http://localhost:3000/dashboard/getGoals/${auth.userID}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
      })
      const goals = (await data.json()).savings_goals;
      const categories = [];
      for (let i = 0; i < goals.length; i++) {
        categories.push(goals[i].category);
      }
      setOptions(categories);
      setGoal(categories[0]);
      }
      fetchGoals();
      },[dataTables]);
    
      useEffect(() => {
        if (accounts.checking !== null && accounts.savings !== null) {
          setTotal(accounts.checking + accounts.savings);
        }
      }, [accounts]);

    const handleSave = async() => {
      try {
        const response = await axios.post(
          "http://localhost:3000/dashboard/save",
          {
            userID: 2,
            category: goal,
            amount: amount
          }
        );
        setAccounts((prevAccounts) => ({
          ...prevAccounts,
          savings: response.data.total,
        }));
        if (response.data.goal_achieved) {
          setGoalAchieved(true);
        }
      }
      catch(err) {
        console.log(err);
      }
    }
    
    return(
        <div className='Overview'>
            <p>Total Amount: </p>
            <h1 className='total'>${total}</h1>
            <div className= 'accounts'>
              <div className='checkings_total'>
                <p>Checking: </p> 
                <span> ${accounts.checking}</span>
              </div>
              <div className='savings_total'>
                <p>Savings: </p> 
                <span> ${accounts.savings}</span>
                <Popup trigger={<button style={{marginLeft: '-2px'}}><FontAwesomeIcon icon={faSackDollar}/></button>} position="right center">
                 { close => (
                  <div style={{fontSize: '16px'}}>
                      <div>save <br></br>$<input type='text' onChange={e => setAmount(e.target.value)}></input> towards</div>
                      <select value={goal} onChange={e => setGoal(e.target.value)}>
                        {options.map((option) => (
                          <option value={option}>{option}</option>
                        ))}
                      </select>
                      <button onClick={() => {handleSave(); close()}}>save <FontAwesomeIcon icon={faPiggyBank} /></button>
                  </div>
                  )}
                </Popup>
              </div>
            </div>
        </div>
    )
}
export default Overview;