// const axios = require('axios');

// const stockController = {};

// stockController.getStockData = async (req, res) => {
//   const { ticker } = req.params;

//   try {
//     const apiKey = 'YOUR_YAHOO_FINANCE_API_KEY';
//     const response = await axios.get(
//       `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}`,
//       {
//         headers: {
//           'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//           'x-rapidapi-key': apiKey,
//         },
//       }
//     );

//     // Extract relevant stock data from the API response
//     const stockData = response.data;

//     // Send the data back to the client
//     res.json(stockData);
//   } catch (error) {
//     // Handle any errors that occurred during the API call
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

// module.exports = stockController;

