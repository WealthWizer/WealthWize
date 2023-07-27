import Chart from "react-apexcharts";
import React, { useState } from "react";

export default function ApexDonut({ goals, dropDown, setReachGoal }) {
    // console.log('goals: ', goals)
    // console.log('dropdown: ', dropDown)

    const series = [];

    goals.map((goal) => {
        if (goal.category === dropDown) {

            console.log('goals map:', goal)

            const firstVal = Math.trunc(goal.total / goal.goal * 100)
            const secondVal = 100 - firstVal
            series.push(firstVal, secondVal)
        }
    })

    if (series[0] < 100) {
        setReachGoal(false);
        const options = { //data on the x-axis
            // chart: { id: 'donut' },
            // xaxis: {
            //     categories: []
            // }
            chart: {
                type: 'donut',
                // background: 'red',
                height: '800px',
                sparkline: {
                    borderWidth: 2 // Set the desired border width here
                },
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#1E9700', '#EBEBEB'],
            stroke: {
                show: false,
                width: 0
            },
            labels: ['amount', 'total'],
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    expandOnClick: true,
                    customScale: 1,
                    size: 800,
                    donut: {
                        size: '80%',
                        label: {
                            show: false
                        }
                    }
                }
            },
            legend: {
                show: false,
                position: 'bottom'
            }
        }
        return (
            <div className='donut'>
                {/* <button onClick={removeGoal}>-</button> */}
                {/* <Popup trigger={<button>-</button>} position="right center">
                    <h5>{dropDown}</h5>
                    <label>Current Goal: {currentGoal}</label>
                    <br></br>
                    <label>New Goal: <input type='text' onChange={e => newGoal=e.target.value}></input></label>
                    <button onClick={updateGoal}>Update</button>
                    <button onClick={removeGoal}>Remove</button>
                </Popup> */}
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="350px"
                />
            </div >
        )
    } else {
        setReachGoal(true);
        const options = { //data on the x-axis
            // chart: { id: 'donut' },
            // xaxis: {
            //     categories: []
            // }
            chart: {
                type: 'donut',
                // background: 'red',
                height: '800px',
                sparkline: {
                    borderWidth: 2 // Set the desired border width here
                },
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#1E9700', '#EBEBEB'],
            stroke: {
                show: false,
                width: 0
            },
            labels: ['amount', 'total'],
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    expandOnClick: true,
                    customScale: 1,
                    size: 800,
                    donut: {
                        size: '0%',
                        label: {
                            show: false
                        }
                    }
                }
            },
            legend: {
                show: false,
                position: 'bottom'
            }
        }
        return (
            <div className='donut'>
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="350px"
                />
            </div >
        )
    }
}