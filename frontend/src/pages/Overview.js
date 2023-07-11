import React, { useState,useEffect, useContext } from 'react';

const Overview =()=>{
// const [total, setTotal] = useState(null);
// const [accounts,setAccounts] = useState({checking: 5000, savings:0});


// useEffect(()=>{
//     const auth=useContext(AuthContext);
//     const userID=auth.userID;
//     console.log('hi i am in useEffect inside overview')
//     const totalSavingsdata = async()=>{

//         try{
//             const response = await fetch('http://localhost:3000/dashboard');
//             const jsonData=await response.json();
//             console.log(jsonData);
//             setAccounts({checking:5000, savings:jsonData.totalsavings})

//             console.log('this is the total savings jsonData',jsonData.totalsavings);

//             setTotal(jsonData.totalsavings+5000);

//         }
//         catch(error){
//             console.log('error at fetching total savings',error);
//         }
//     };

//     totalSavingsdata();
// },[])

    return(
        <div className='Overview'>
            <h1> </h1>
            {/* <p>Checking: {accounts.checking}</p>
            <p>savings: {accounts.savings}</p> */}
        </div>
    )
}
export default Overview;