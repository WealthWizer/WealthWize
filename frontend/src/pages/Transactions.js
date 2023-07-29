import React, { useEffect, useState, useContext } from 'react';
import FilterIcon from '../images/Icons/filter';
import './transaction.css';
import { AuthContext } from "../authContext.js";
// import { use } from 'bcrypt/promises';
// import { set } from 'mongoose';

const Transactions = ({ dataTables }) => {
    // CREATING CURRENT DATE STARTING 1 MONTH BEFORE
    const d = new Date();
    const dStringStart = d.getFullYear() + '-' + ('0' + (d.getMonth())).slice(-2) + '-' + ('0' + (d.getDate())).slice(-2)
    const dStringEnd = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + (d.getDate())).slice(-2)

    // SETTING STATE
    // const auth = useContext(AuthContext);
    // hardcoded for testing
    const auth = {
        userID: 2,
        username: 'shiyuliu',
        token: 'test'
    }
    const [transactions, setTransactions] = useState([]);
    const [dateStart, setDateStart] = useState(dStringStart);
    const [dateEnd, setDateEnd] = useState(dStringEnd);
    const [filterTransaction, setFilterTransaction] = useState(true);
    const [filterCategory, setFilterCategory] = useState(false);
    const [total, setTotal] = useState();
    const [categories, setCategories] = useState({});
    // const [budget, setBudget] = useState(dataTables);
    const budget = dataTables.budget;


    // HANDLERS
    const handleStart = (date) => {
        setDateStart(date);
    }

    const handleEnd = (date) => {
        setDateEnd(date);
    }

    const handleOnChange = (value) => {
        if (value === 'Transactions') {
            setFilterTransaction(true);
            setFilterCategory(false);
        } else if (value === 'Categories') {
            setFilterTransaction(false);
            setFilterCategory(true);
            categoryMaker();
        }
    }

    const categoryMaker = () => {
        // console.log('transactions: ', transactions)
        const categoryObj = [];
        let total = 0;
        console.log('transactions inside category: ', typeof transactions)

        transactions.forEach((transaction) => {
            categoryObj[transaction.category] = (categoryObj[transaction.category] || 0) + transaction.amount;
            total += transaction.amount;
        })


        setCategories(categoryObj)
        setTotal(total);
        // console.log('categoryObj: ', categoryObj)
        // console.log('total: ', total)
    };



    useEffect(() => {
        // () => setTransactions(datatables)
        fetch('http://localhost:3000/dashboard/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                // sending month for range of month - weekStart and weekEnd
                userID: auth.userID,
                dateStart: dateStart,
                dateEnd: dateEnd
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // receiving object  with transaction.item, transaction.amount, transaction.category, user.id
                setTransactions(data)
                console.log('transactions: ', typeof transactions)
                if (filterCategory) categoryMaker();
            })
            .catch(err => console.log(err))
    }, [dateStart, dateEnd, JSON.stringify(transactions)]);

    // useEffect(() => {
    //     setBudget(dataTables.budget)
    // }, [dataTables]);


    console.log('dataTables Budget: ', budget)
    // const month = dateEnd[0];
    // console.log('month ', month)
    // console.log('d:', d)
    // console.log('dateEnd:', dateEnd)
    // console.log('dateStart:', dateStart)
    // console.log('transactions:', transactions)
    // console.log('categories: ', categories)

    return (
        <div className='Transactions'>
            <div className='header'>
                <h1>Transactions</h1>
                <select onChange={(e) => handleOnChange(e.target.value)}>
                    <option>Transactions</option>
                    <option>Categories</option>
                </select>
                <span className='filterIcon'><FilterIcon /></span>
            </div>
            {filterTransaction &&
                <div className='date-range'>
                    <p>{dateStart} - </p>
                    <p>{dateEnd}</p>
                    <input id='week-start' type='date' value={dateStart} onChange={(e) => { handleStart(e.target.value) }}></input>
                    <input id='week-end' type='date' value={dateEnd} onChange={(e) => { handleEnd(e.target.value) }}></input>
                </div>
            }
            {filterTransaction && transactions.map((transaction) => {
                console.log(transaction)
                return (
                    <>
                        <div className='single-transaction'>
                            {/* <button key={`btn_${transaction.id}`}>edit</button> */}
                            <div key={transaction.id} className='transaction-firstline'>
                                {/* <p>{transaction.item}</p> */}
                                <p>{transaction.vendor_name}</p>
                                <p id='transaction-category'>{transaction.category}</p>
                            </div>
                            <p>${transaction.amount}</p>
                        </div>
                    </>
                )
            })
            }
            {filterCategory &&
                Object.entries(categories).sort((a, b) => b[1] - a[1]).map((category) => {
                    
                    let total = 0;
                    budget.forEach((element) => {
                        if (element.category == category[0]) {
                            total = element.budget;
                        }
                    });
                    // console.log(total, category[1])
                    const greenBar = Math.trunc(category[1] / total * 100);
                    const greyBar = 100 - greenBar;

                    return (
                        <div className='categories'>
                            <div className='category-data'>
                                <div>{category[0]}</div>
                                <div>${category[1]}</div>
                            </div>
                            <div className='category-bars'>
                                <div className='green-bar' style={{ width: `${greenBar}%` }}></div>
                                <div className='grey-bar' style={{ width: `${greyBar}%` }}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Transactions;


