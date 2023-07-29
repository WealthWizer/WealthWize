import React, { useState, useContext } from "react";
import "./stockForm.css";
import { AuthContext } from "../authContext";
import { useDispatch } from "react-redux";
import { addStock } from "../reducers/stockSlice";
import axios from "axios";

function stockForm ({ userID, setSidebar }) {
  const auth = useContext(AuthContext);
  const d = new Date();
  
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [stockShares, setStockShares] = useState("");
  const [date, setDate] = useState(d);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stockName || !stockPrice || !date) {
      // Add your own validation logic here if needed
      alert("Please fill in all fields.");
      return;
    }

    const auth = {
      userID: 2,
      username: 'shiyuliu',
      token: 'test'
  }

    try {
      const res = await axios.post('http://localhost:3000/dashboard/stocks', {
        method: POST,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth.token}`
          },
        body: JSON.stringify({
          userID: auth.userID,
          stock_name: stockName,
          stock_price: stockPrice,
          num_shares: stockShares,
          date,
          }),
        })
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setSidebar(false);
  }

  const handleName = (event) => {
    setStockName(event.target.value);
  };

  const handlePrice = (event) => {
    setStockPrice(event.target.value);
  };
  
  const handleShares = (event) => {
    setStockShares(event.target.value);
  };

  const handleDate = (val) => {
    const dateInput = new Date(val);
    const formattedDate = dateInput.toISOString().split('T')[0];
    setDate(formattedDate);
  };

  return (
    <form className="goalForm" onSubmit={handleSubmit}>
      <label>Enter the stocks data</label>
      <input placeholder="Ticker symbol" onChange={handleName}/>
      <input placeholder = "Purchase Price" onChange={handlePrice}/>
      <input placeholder = "Number of shares" onChange={handleShares}/> 
      {/* <input type="date" onChange={handleDate}/>  */}
      <button type='submit' className='submit-button'>Submit</button>
    </form>
  )
}

export default stockForm;