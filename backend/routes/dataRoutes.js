const express = require("express");

const dataController = require("../controller/dataController");
const authController = require("../controller/authController");
// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.get(
  "/",
  authController.protectRoute,
  dataController.savings,
  dataController.budget,
  dataController.savings_goals,
  dataController.transactions,
  dataController.users
);

module.exports = router;
