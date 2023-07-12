import React, { useState,useEffect, useContext } from 'react';

const Overview =({dataTables})=>{

const [total, setTotal] = useState(null);
const [accounts, setAccounts] = useState({checking:5000, savings:0});
console.log(dataTables.savings);


    useEffect(() => {
        const fetchSavings = async () => {
          try {
            let savingsTable = dataTables.savings;
            console.log(savingsTable);
            let savingsSum = 0;
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
        if (accounts.checking !== null && accounts.savings !== null) {
          setTotal(accounts.checking + accounts.savings);
        }
      }, [accounts]);


    return(
        <div className='Overview'>
            <h1>total: {total}</h1>
            <p>Checking: {accounts.checking}</p>
            <p>savings: {accounts.savings}</p>
        </div>
    )
}
export default Overview;