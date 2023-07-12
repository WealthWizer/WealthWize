const express = require("express");

const dataController = require("../controller/dataController")
const transactionController = require('../controller/transactionController')

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.get("/", dataController.savings, dataController.budget, dataController.savings_goals,
    dataController.transactions, dataController.users);


router.post('/transaction', transactionController.rangeOfTransactions)

module.exports = router;
