const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth.middleware");

// Signup route
router.post("/signup", authController.signup);

// Login route
router.post("/login", authController.login);

// Get current user route
router.get("/me", auth, authController.getCurrentUser);

module.exports = router;
