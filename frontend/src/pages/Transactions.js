import React, { useEffect, useState } from 'react';
import FilterIcon from '../images/Icons/filter';
import './transaction.css';
import { use } from 'bcrypt/promises';
import { set } from 'mongoose';

const Transactions = () => {
    const [transactions, setTransactions] = useState([
        { item: 'Whole Food', amount: '$' + 135, category: 'Grocery', id: 1 },
        { item: 'MTA', amount: '$' + 12, category: 'Transportation', id: 2 },
        { item: 'H&M', amount: '$' + 120, category: 'Clothing', id: 3 },
        { item: 'McDonalds', amount: '$' + 15, category: 'Dining', id: 4 },
        { item: 'Whole Food', amount: '$' + 135, category: 'Grocery', id: 5 },
        { item: 'MTA', amount: '$' + 12, category: 'Transportation', id: 6 },
        { item: 'H&M', amount: '$' + 120, category: 'Clothing', id: 7 },
        { item: 'McDonalds', amount: '$' + 15, category: 'Dining', id: 8 },
        { item: 'Whole Food', amount: '$' + 135, category: 'Grocery', id: 9 },
        { item: 'MTA', amount: '$' + 12, category: 'Transportation', id: 10 },
        { item: 'H&M', amount: '$' + 120, category: 'Clothing', id: 11 },
        { item: 'McDonalds', amount: '$' + 15, category: 'Dining', id: 12 },
    ]);


    const [weekStart, setWeekStart] = useState();
    const [weekEnd, setWeekEnd] = useState();
    const [filter, setFilter] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // sending month for range of month - weekStart and weekEnd
                // sending filter 
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // receiving object  with transaction.item, transaction.amount, transaction.category, user.id
            })
            .catch(err => console.log(err))
    }, [filter, transactions, weekStart, weekEnd]);


    console.log('weekEnd:', weekEnd)
    console.log('weekStart:', weekStart)
    console.log('filter:', filter)
    return (
        <div className='Transactions'>
            <div className='header'>
                <h1>Transactions</h1>
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option>Transactions</option>
                    <option>Categories</option>
                </select>
                <span className='filterIcon'><FilterIcon /></span>
            </div>
            <div className='date-range'>
                <input id='week-start' type='week' onChange={(e) => { setWeekStart(e.target.value) }}></input>
                <input id='week-end' type='week' onChange={(e) => { setWeekEnd(e.target.value) }}></input>
                <p>{weekStart} -</p>
                <p>{weekEnd}</p>
            </div>
            {transactions.map((transaction) => {
                // console.log(transaction)
                return (
                    <>
                        <div className='single-transaction'>
                            <div key={transaction.id} className='transaction-firstline'>
                                <p>{transaction.item}</p>
                                <p id='transaction-category'>{transaction.category}</p>
                            </div>
                            <p >{transaction.amount}</p>
                        </div>
                    </>
                )
            })}
        </div>
    )
}
export default Transactions;