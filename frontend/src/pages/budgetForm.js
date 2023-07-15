import React, { useState } from 'react';
import CloseIcon from '../images/Icons/close';
import GroceriesIcon from '../images/Icons/groceries';
import DiningIcon from '../images/Icons/dining';
import EntertainmentIcon from '../images/Icons/entertainment';
import ClothingIcon from '../images/Icons/clothing';
import SubscriptionIcon from '../images/Icons/subscription';
import UtilitiesIcon from '../images/Icons/utilities';
import MediaclIcon from '../images/Icons/medical';
import TransportationIcon from '../images/Icons/transportation';
import HousingIcon from '../images/Icons/housing';


function BudgetForm() {

    const [goalAmount, setGoalAmount] = useState();

    

    return (
        <div className='category-buttons'>
            <h2>Add your Budget</h2>
            <form>
                <input placeholder='Amount' onChange={(e) => setGoalAmount(e.target.value)}></input>
            </form>
            <div>
                <button><GroceriesIcon /></button>
                <p>Grocery</p>
            </div>
            <div>
                <button><DiningIcon /></button>
                <p>Dining</p>
            </div>
            <div>
                <button><EntertainmentIcon /></button>
                <p>Entertainment</p>
            </div>
            <div>
                <button><ClothingIcon /></button>
                <p>Clothing</p>
            </div>
            <div>
                <button><SubscriptionIcon /></button>
                <p>Subscription</p>
            </div>
            <div>
                <button><UtilitiesIcon /></button>
                <p>Utilites</p>
            </div>
            <div>
                <button><MediaclIcon /></button>
                <p>Medical</p>
            </div>
            <div>
                <button><TransportationIcon /></button>
                <p>Transportation</p>
            </div>
            <div>
                <button><HousingIcon /></button>
                <p>Housing</p>
            </div>
        </div>)

}

export default BudgetForm;