import React, { useState } from 'react';
import Navbar from './navbar.js';
import Budget from './Budget.js';
import Goals from './Goals.js';
import Sidebar from './Sidebar.js';
import Transactions from './Transactions.js';
import Overview from './Overview.js';
import './dashboard.css';

const Dashboard = ()=>{


    return(

        <div className='dashboard'>
        <Navbar className='Navbar'/>
        <Overview className='Overview'/>
        <Transactions className='Transactions'/>
        <Budget className='Budget'/>
        <Goals className='Goals'/>
        <button id='sidebar buttons'> button name</button>
        <Sidebar className='Sidebar'/>
        </div>
    )

 }


export default Dashboard;