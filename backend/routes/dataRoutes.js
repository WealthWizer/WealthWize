const express = require("express");

const dataController = require("../controller/dataController")
// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.get("/", dataController.savings, dataController.budget, dataController.savings_goals, 
dataController.transactions, dataController.users);

module.exports = router;
