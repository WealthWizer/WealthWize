import React, { useState } from 'react';
import NotificationIcon from '../images/Icons/notification';
import './navbar.css';
import '../index.css'

const Navbar = ({ username, setIsLoggedIn }) => {

    return (
        <div className='Navbar'>
            <div className='logo'>WealthWize</div>
            <div className='navbar-items'>
                <NotificationIcon onClick={()=> {}} />
                <div className='user'>
                    <div className='user-photo'></div>
                    <p>{username}</p>
                </div>
                <button type='button' onClick={() => setIsLoggedIn('false')}>Logout</button>
            </div>
        </div>
    )
}
export default Navbar;