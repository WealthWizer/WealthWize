const express = require("express");

const dataController = require("../controller/dataController");
const authController = require("../controller/authController");

const transactionController = require("../controller/transactionController");

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES

router.get(
  "/:userID",
  // authController.protectRoute,
  dataController.savings,
  dataController.budget,
  dataController.savings_goals,
  dataController.transactions,
  dataController.users,
  dataController.getAllStocks
);

// for updating budget
router.get('/getUserBudget/:userID', dataController.budget);

router.get('/getGoals/:userID', dataController.savings_goals);

router.post('/save', dataController.save);

router.post("/transaction", transactionController.rangeOfTransactions);

router.post("/savinggoals", transactionController.goalTracker);

router.post("/budget", transactionController.budgetSetter);

router.post("/savegoal", dataController.savingGoals);

router.post("/expense", dataController.newExpense);

router.patch('/updateGoal', dataController.updateGoal);

router.delete('/removeGoal', dataController.removeGoal);

router.get("/stocks", dataController.getAllStocks);

router.post("/stocks", dataController.addStock);

// router.get("/stocks/:stockID", dataController.getStockById);

router.delete("/stocks/:stockID", dataController.deleteStock);

module.exports = router;
