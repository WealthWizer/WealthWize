const express = require("express");
const authController = require("../controller/authController");

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.post("/login", authController.login);
router.post("/signup", authController.signup);


module.exports = router;
