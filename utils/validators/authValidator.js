// check have(body,param)
const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const User = require("../../models/userModel");
const validatorMiddleware = require("../../middleware/validationMiddleware");
const ApiError = require("../apiError");

const signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("name of user is required and cant be empty !")
    .isLength({ min: 3, max: 32 })
    .withMessage("name length should be between 3 and 32 character ")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("email field required ")
    .isEmail()
    .withMessage("invalid email address")
    .custom(async (val) => {
      // findOne return single value or null but find return array of users
      await User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(
            new ApiError("Email address is already exist ", 404)
          );
        }
      });
    }),

  check("password")
    .notEmpty()
    .withMessage("password field is required ")
    .isLength({ min: 6 })
    .withMessage("password length is short ")
    .custom((val, { req }) => {
      if (val !== req.body.passwordConfirm) {
        throw new Error("password not matched ");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmation is required "),

  validatorMiddleware,
];


const loginValidator = [

  check("email")
    .notEmpty()
    .withMessage("email field required ")
    .isEmail()
    .withMessage("invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("password field is required ")
    .isLength({ min: 6 })
    .withMessage("password length is short "),

  validatorMiddleware,
];




module.exports = { signupValidator, loginValidator };
