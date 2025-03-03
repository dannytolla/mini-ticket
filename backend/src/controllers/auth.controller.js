const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authService = require("../services/auth.service");

// Controller for user signup
exports.signup = async (req, res) => {
  try {
    const userData = req.body;
    const result = await authService.registerUser(userData);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(error.message === "User already exists" ? 400 : 500)
      .json({ message: error.message });
  }
};

// Controller for user login
exports.login = async (req, res) => {
  try {
    const credentials = req.body;
    const result = await authService.loginUser(credentials);

    res.json(result);
  } catch (error) {
    res
      .status(error.message === "Invalid credentials" ? 401 : 500)
      .json({ message: error.message });
  }
};

// Controller to get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
