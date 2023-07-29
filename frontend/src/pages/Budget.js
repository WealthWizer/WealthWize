import React, { useState, useEffect, useContext } from "react";
import BudgetChart from "./BudgetChart";
import "./budget.css";

const Budget = ({ dataTables }) => {
  const [totalBudget, setTotalBudget] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [sumTrans, setSumTrans] = useState(null);
  //set last 30 days;
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        let budgetTable = dataTables.budget;
        console.log('shiyu budget: ', budgetTable);
        if (budgetTable && budgetTable.length > 0) {
          let budgetSum = 0;
          budgetTable.forEach((row) => {
            budgetSum += row.budget;
            console.log('budgetSum', budgetSum);
          });
          setTotalBudget(budgetSum);
          console.log('totalBudget', totalBudget);
        } else {
          console.log('setting budget to 0')
          setTotalBudget(0); // Set a default value if the budget table is empty
        }
      } catch (err) {
        console.log("Error at fetchBudget: ", err);
      }
    };

    fetchBudget();
  }, [dataTables]);
  //have to grab all the data from the month for the transactions table
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let transactions = dataTables.transactions;
        //set date range to be the last 30 days so in this case it would
        //be july

        const filteredTrans = transactions
          .filter((row) => {
            const rowDate = new Date(row.date); // Assuming there's a 'date' property in the transaction object
            return rowDate >= lastMonthDate && rowDate <= currentDate;
          })
          .map((row) => ({
            ...row,
            date: new Date(row.date).toLocaleDateString("en-US"),
          }));

        //filteredTrans is filtered by last 30 days

        //now create function that sums each day, so returned obj will contain
        //dates as keys and corresponding total amoutns spend each day as vals

        const consolidateDates = function (obj) {
          const cache = {};
          for (let i in obj) {
            let currDate = obj[i].date;
            if (cache[currDate]) {
              cache[currDate] += obj[i].amount;
            } else {
              cache[currDate] = obj[i].amount;
            }
          }
          return cache;
        };
        //consolidatedtrans is obj containing dates and amounts
        let consolidatedTrans = consolidateDates(filteredTrans);

        setTransactions(consolidatedTrans);
      } catch (err) {
        console.log("Error at fetchTransactions in Budget.js: ", err);
      }
    };
    fetchTransactions();
  }, [dataTables]);

  //now generate the summed transactions
  useEffect(() => {
    const CumulativeTrans = async () => {
      let dateArr = [];
      try {
        //update dateArr to contain all dates for the last 30 days
        for (
          let date = new Date(lastMonthDate);
          date <= currentDate;
          date.setDate(date.getDate() + 1)
        ) {
          const dateString = new Date(date).toLocaleDateString("en-US");
          dateArr.push(dateString);
        }

        dateArr.map((date) => {
          new Date(date).toLocaleDateString("en-US");
        });

        const createcumuTrans = (transactionsobj, dateArr) => {
          let cumuTrans = {};
          let sum = 0;
          dateArr.forEach((date) => {
            //if this date exists in transactions table then add the amount to sum
            if (transactions[date]) {
              sum += transactions[date];
            }
            cumuTrans[date] = sum;
          });
          return cumuTrans;
        };

        let cumuTrans = createcumuTrans(transactions, dateArr);

        setSumTrans(cumuTrans);
      } catch (err) {
        console.log("error in cumulativeTrans", err);
      }
    };
    CumulativeTrans();
  }, [transactions]);
  //generate graph

  return (
    <div className="Budget">
      <h1>Monthly Spending</h1>
      {/* <p>{JSON.stringify(transactions)}</p> */}
      <BudgetChart
        totalBudget={totalBudget}
        sumTrans={sumTrans}
        transactions={transactions}
      />
    </div>
  );
};
export default Budget;
