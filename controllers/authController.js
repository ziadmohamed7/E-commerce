const asyncHandler = require("express-async-handler");
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");

const generateToken = (userId) =>
  jwt.sign({ userId: userId }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signup = asyncHandler(async (req, res, next) => {
  // 1) create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2) generate token using jwt
  // sign === create token
  const token = generateToken(user._id);

  res.status(201).json({ data: user, token });
});

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiError("Invalid email or password ", 401));
  }
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) {
    return next(new ApiError("Invalid email or password ", 401));
  }
  const token = generateToken(user._id);

  res.status(200).json({ data: user, token });
});

const protect = asyncHandler(async (req, res, next) => {
  // 1) check if token is exits or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(
        new ApiError(
          "You are not login, Please login to get access this route.",
          401
        )
      );
    }
  }

  // 2) verify token no change happened or expired
  const decoded = jwt.verify(token,process.env.JWT_SECRETE_KEY);

  // 3) check if user is exits using _id from decoded 
  const user = await User.findById(decoded.userId);
  if(!user){
    return next(new ApiError("user not exits , please sign up and back. "),401)
  }

  // 4) check if user change his password after token created
  next();
});

module.exports = { signup, login, protect };
