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
  dataController.users
);

// for updating budget
router.get('/getUserBudget/:userID', dataController.budget);

router.get('/getGoals/:userID', dataController.savings_goals);

router.get('/getSavings/:userID', dataController.savings);

router.post('/save', dataController.save);

router.post("/transaction", transactionController.rangeOfTransactions);

router.post("/savinggoals", transactionController.goalTracker);

router.post("/budget", transactionController.budgetSetter);

router.post("/savegoal", dataController.savingGoals);

router.post("/expense", dataController.newExpense);

router.patch('/updateGoal', dataController.updateGoal);

router.delete('/removeGoal', dataController.removeGoal);

module.exports = router;
