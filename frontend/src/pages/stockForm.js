import React, { useState, useContext } from "react";
import "./stockForm.css";
import { AuthContext } from "../authContext";
import { useDispatch } from "react-redux";
import { addStock } from "../reducers/stockSlice";
import axios from "axios";

function stockForm ({ userID, setSidebar }) {
  // const auth = useContext(AuthContext);
  // const d = new Date();
  const auth = {
    userID: 2,
    username: 'shiyuliu',
    token: 'test'
  }

  const user_id = auth.userID;
  
  const [stock_name, setStockName] = useState('');
  const [stock_price, setStockPrice] = useState('');
  const [num_shares, setStockShares] = useState('');
  // const [date, setDate] = useState(d);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSidebar(false);
    try {
      const res = await fetch('http://localhost:3000/dashboard/stocks', {
        method: POST,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth.token}`
          },
        body: JSON.stringify({
          user_id: user_id,
          stock_name: stock_name,
          stock_price: stock_price,
          num_shares: num_shares,
          // date,
          }),
        })
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleName = (val) => {
    setStockName(val);
  };

  const handlePrice = (val) => {
    setStockPrice(val);
  };
  
  const handleShares = (val) => {
    setStockShares(val);
  };

  // const handleDate = (val) => {
  //   const dateInput = new Date(val);
  //   const formattedDate = dateInput.toISOString().split('T')[0];
  //   setDate(formattedDate);
  // };

  return (
    <form className="goalForm" onSubmit={handleSubmit}>
      <label>Enter the stocks data</label>
      <input placeholder="Ticker symbol" value={stock_name} onChange={(e) => { handleName(e.target.value) }}></input>
      <input placeholder = "Purchase Price" value={stock_price} onChange={(e) => { handlePrice(e.target.value) }}></input>
      <input placeholder = "Number of shares" value={num_shares} onChange={(e) => { handleShares(e.target.value) }}></input> 
      {/* <input type="date" onChange={handleDate}/>  */}
      <button type='submit' className='submit-button'>Submit</button>
    </form>
  )
}

export default stockForm;