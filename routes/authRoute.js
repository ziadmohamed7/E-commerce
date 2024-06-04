const express = require("express");
const {
  signup,
  login
} = require("../controllers/authController");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();


// routes
router.route("/signup").post(signupValidator,signup);
router.route("/login").post(loginValidator, login);

module.exports = router;
