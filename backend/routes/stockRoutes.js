// const express = require("express");
// const router = express.Router();

// const stockController = require("../controller/stockController");

// router.get('/:ticker', stockController.getStockData);

// module.exports = router;

const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

// ROUTES
router.get("/:userID/stocks", stockController.getAllStocks);
router.post("/:userID/stocks", stockController.addStock);
router.get("/:userID/stocks/:stockID", stockController.getStockById);
router.delete("/:userID/stocks/:stockID", stockController.deleteStock);

module.exports = router;