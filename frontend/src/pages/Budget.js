import React, { useState } from 'react';

const Budget =({dataTables})=>{
// const [totalBudget, setTotalBudget] = useState(null);
// const [transactions, seTransactions] = useState(null);

// //have to grab totalbudget from the budget table
// useEffect(()=>{
//     const fetchBudget = async()=>{
//         try{
//             let budgetTable=dataTables.budget;
//             let budgetSum=0;

//             budgetTable.forEach((row)=>{
//                 budgetSum+= row.amount;
//             });
//             setTotalBudget(budgetSum);
//         }
//         catch(err){
//             console.log('Error at fetchBudget: ',err)
//         }
//     };

//     fetchBudget();
// },[dataTables])
// //have to grab all the data from the month for the transactions table
// useEffect(()=>{
//     const fetchTransactions = async()=>{
//         try{
//             let transactions=dataTables.transactions;
//             //set date range to be the last 30 days so in this case it would
//             //be july


//         }
//         catch(err){
//             console.log('Error at fetchTransactions in Budget.js: ', err)
//         }
//     }
// })
// //generate graph


    return(
        <div className='Budget'>

        </div>
    )
}
export default Budget;