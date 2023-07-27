import React, { useState, useContext } from "react";
import "./goalForm.css";
import { AuthContext } from "../authContext";
import axios from "axios";

function stockForm ({ setSidebar }) {
  const auth = useContext(AuthContext);
  const d = new Data();
  
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [stockShares, setStockShares] = useState("");
  const [date, setDate] = useState(d);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSidebar(false);

    try {
      console.log(stockPrice)
      const res = await axios.post('http://localhost:3000/dashboard/investment'), {
        method: POśT,
        headers: {
          'Content-type': 'application/json',
          Authorizatiosn: 'Bearer ${auth.token};
        },
        body: JSON.stringify({
          userID: auth.userID,
          stockPrice: stockPrice,
          stockShares: stockShares,
          date: date;
        })
      }
    }
  }

  const handleName = (val) => {
    setStockName(val);
  }

  const handlePrice = (val) => {
    setStockPrice(val);
  }
  
  const handleShares = (val) => {
    setStockPrice(val);
  }

  const handleDate = (val) => {
    const dateInput = new Date(val);
    const formattedDate = dateInput.toISOString().split('T')[0];
    setDate(formattedDate);
  }

  const handle
}