import React, { useEffect, useState } from 'react';
import FilterIcon from '../images/Icons/filter';
import './transaction.css';
// import { use } from 'bcrypt/promises';
// import { set } from 'mongoose';

const Transactions = ({ datatables }) => {
    // CREATING CURRENT DATE STARTING 1 MONTH BEFORE
    const d = new Date();
    const dStringStart = d.getFullYear() + '-' + ('0' + (d.getMonth())).slice(-2) + '-' + ('0' + (d.getDay())).slice(-2)
    const dStringEnd = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + (d.getDay())).slice(-2)

    // SETTING STATE
    const [transactions, setTransactions] = useState([]);
    const [dateStart, setDateStart] = useState(dStringStart);
    const [dateEnd, setDateEnd] = useState(dStringEnd);
    const [filterTransaction, setFilterTransaction] = useState(true);
    const [filterCategory, setFilterCategory] = useState(false);
    const [total, setTotal] = useState();
    const [categories, setCategories] = useState({});
    // const [transactions, setTransactions] = useState();
    // const [transactions, setTransactions] = useState(datatables);


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
        const categoryObj = {};
        let total = 0;

        transactions.forEach((transaction) => {
            categoryObj[transaction.category] = (categoryObj[transaction.category] || 0) + transaction.amount;
            total += transaction.amount;
        })

        setCategories(categoryObj)
        setTotal(total);
        console.log('categoryObj: ', categoryObj)
        console.log('total: ', total)
    };



    useEffect(() => {
        // () => setTransactions(datatables)
        fetch('http://localhost:3000/dashboard/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // sending month for range of month - weekStart and weekEnd
                dateStart: dateStart,
                dateEnd: dateEnd
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // receiving object  with transaction.item, transaction.amount, transaction.category, user.id
                setTransactions(data)
                if (filterCategory) categoryMaker();
            })
            .catch(err => console.log(err))
    }, [dateStart, dateEnd, JSON.stringify(transactions)]);



    // const month = dateEnd[0];
    // console.log('month ', month)
    // console.log('d:', d)
    // console.log('dateEnd:', dateEnd)
    // console.log('dateStart:', dateStart)
    // console.log('transactions:', transactions)
    console.log('categories: ', categories)

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
            <div className='date-range'>
                <p>{dateStart} -</p>
                <p>{dateEnd}</p>
                <input id='week-start' type='date' value={dateStart} onChange={(e) => { handleStart(e.target.value) }}></input>
                <input id='week-end' type='date' value={dateEnd} onChange={(e) => { handleEnd(e.target.value) }}></input>
            </div>
            {filterTransaction && transactions.map((transaction) => {
                // console.log(transaction)
                return (
                    <>
                        <div className='single-transaction'>
                            <div key={transaction.id} className='transaction-firstline'>
                                {/* <p>{transaction.item}</p> */}
                                <p>TBD</p>
                                <p id='transaction-category'>{transaction.category}</p>
                            </div>
                            <p >{transaction.amount}</p>
                        </div>
                    </>
                )
            })
            }
            {filterCategory &&
                Object.entries(categories).sort((a, b) => b[1] - a[1]).map((category) => {

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


