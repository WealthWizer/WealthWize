// import React, { useState,useEffect, useContext } from 'react';
// import Chart from "react-apexcharts";


//       const BudgetChart = ({ totalBudget, sumTrans, transactions }) => {
//         const [chartvals, setChartvals] = useState({
//           chart: {
//             type: 'line',
//             height: 350,
//           },
//           dataLabels: {
//             enabled: false,
//           },
//           stroke: {
//             curve: 'smooth',
//           },
//           series: [
//             {
//               name: 'cumulative',
//               data: [], // Will be filled with cumulative transaction data
//             },
//             {
//               name: 'daily',
//               data: [], // Will be filled with daily transaction data
//             },
//             {
//               name: 'budget',
//               data: [totalBudget, totalBudget],
//             },
//           ],
//           xaxis: {
//             categories: [], // Will be filled with dates
//           },
//           yaxis: {
//             axisTicks: {
//               show: true,
//             },
//             axisBorder: {
//               show: true,
//             },
//           },
//         });
      
//         useEffect(() => {
//         const updategraph= async()=>{
//             try{
//   // Format cumulative transaction data
//   const cumulativeData=Object.values(sumTrans);
//   // Format daily transaction data
//   const dailyData = Object.values(transactions);

//   // Get dates from the transaction objects
//   const dates = Object.keys(transactions);

//   setChartvals((prevChartVals) => ({
//     ...prevChartVals,
//     series: [
//       { ...prevChartVals.series[0], data: cumulativeData },
//       { ...prevChartVals.series[1], data: dailyData },
//     ],
//     xaxis: { ...prevChartVals.xaxis, categories: dates },
//   }));
//             }
//             catch(err){
//                 console.log(err);
//             }
//         }
//         updategraph();
//         }, [transactions]);

//     return(
//         <div className='budgetchart'>
//             <Chart
//             options={chartvals}
//             series={chartvals.series}/>
//         </div>
//     )
// }
// export default BudgetChart;



import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const BudgetChart = ({ totalBudget, sumTrans, transactions }) => {
  const [chartvals, setChartvals] = useState({
    chart: {
      type: 'line',
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    series: [
      {
        name: 'cumulative',
        data: [], // Will be filled with cumulative transaction data
      },
      {
        name: 'daily',
        data: [], // Will be filled with daily transaction data
      },
      {
        name: 'budget',
        data: [totalBudget, totalBudget],
      },
    ],
    xaxis: {
      categories: [], // Will be filled with dates
    },
    yaxis: {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
    },
  });

  useEffect(() => {
    const updateGraph = async () => {
      try {
        // Format cumulative transaction data
        const cumulativeData = Object.values(sumTrans);

        // Format daily transaction data
        const dailyData = Object.values(transactions);

        // Get dates from the transaction objects
        const dates = Object.keys(transactions);

        setChartvals((prevChartVals) => ({
          ...prevChartVals,
          series: [
            { ...prevChartVals.series[0], data: cumulativeData },
            { ...prevChartVals.series[1], data: dailyData },
          ],
          xaxis: { ...prevChartVals.xaxis, categories: dates },
        }));
      } catch (err) {
        console.log(err);
      }
    };

    updateGraph();
  }, [transactions, sumTrans]);

  return (
    <div className="budgetchart">
      <Chart options={chartvals} series={chartvals.series} type="line" height={chartvals.chart.height} />
    </div>
  );
};

export default BudgetChart;