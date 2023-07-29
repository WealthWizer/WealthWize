import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const StockChart = () => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "stock-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "$" + value.toFixed(2);
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
    series: [
      {
        name: "Stock Price",
        data: [],
      },
    ],
  });

  const selectedStock = useSelector((state) => state.stocks.selectedStock);

  useEffect(() => {
    // Here, you should fetch the stock data using the Polygon API
    // Replace this placeholder data with your actual API data
    const stockData = [
      [1627161000000, 145.8],
      [1627247400000, 148.9],
      [1627333800000, 147.3],
      // Add more data points here...
    ];

    // Update the chart options with the fetched data
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: stockData,
        },
      ],
    }));
  }, [selectedStock]);

  return (
    <div>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default StockChart;
