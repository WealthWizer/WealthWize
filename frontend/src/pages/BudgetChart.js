
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const BudgetChart = ({ totalBudget, sumTrans, transactions }) => {
  const [chartvals, setChartvals] = useState({
    chart: {
      type: 'line',
        width: 600,
        height:400,
        dataLabels:{
            position:'bottom',
            align:'right'
        }

        // redrawOnParentResize: true
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
        show: false,
        position: 'bottom'
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
        data: [totalBudget, totalBudget, totalBudget],
      },

    ],
    colors:['#1E9700', '#CCFF79', '#FC6238'],
    // fill:{
    //     type:'gradient',
    //     gradient:{
    //         shadeIntensity:1,
    //         opacityfrom:0.7,
    //         opacityTo:0.9,
    //         colorStops:function(data){
    //                 return data.map((d,idx))=>{
    //                     let color=d>0?'#22c55f':'#ef4544';
    //                     return{
    //                         offset:idx/data.length*100
    //                     }
    //                 }
    //         }
    //     }
    // },
    xaxis: {
      categories: [], // Will be filled with dates
      type: 'datetime',
      tickAmount:9,
      labels:{
        formatter:function(val,timestamp,opts){
            return opts.dateFormatter(new Date(timestamp),'dd MMM')
        }
      }
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
        const dates = Object.keys(sumTrans);
        const cumulativeData = Object.values(sumTrans);

        // Format daily transaction data
        // const dailyData = Object.values(transactions);
        const dailyData=[];
        const budgetData=[];

        for(let i of dates){
            if(!transactions[i]){
                dailyData.push(0);
            }else{

                dailyData.push(transactions[i]);
            }
            budgetData.push(totalBudget);
        }

        setChartvals((prevChartVals) => ({
          ...prevChartVals,
          series: [
            { ...prevChartVals.series[0], data: cumulativeData },
            { ...prevChartVals.series[1], data: dailyData },
            {...prevChartVals.series[2],data: budgetData}
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
      <Chart options={chartvals} series={chartvals.series} type="line" height="400" width="600" />
    </div>
  );
};

export default BudgetChart;