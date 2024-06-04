// check have(body,param)
const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const validatorMiddleware = require("../../middleware/validationMiddleware");
const ApiError = require("../apiError");

const getUserValidator = [
  check("id").isMongoId().notEmpty().withMessage("invalid user id "),
  validatorMiddleware,
];

const createUserValidator = [
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

  check("phone")
    .isMobilePhone("ar-EG")
    .withMessage("invalid phone number ")
    .optional(),

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

  check("profileImage").optional(),
  check("role").optional(),

  validatorMiddleware,
];

const updateUserValidator = [
  // rules
  check("id").isMongoId().notEmpty().withMessage("invalid user id "),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .notEmpty()
    .withMessage("email field required ")
    .isEmail()
    .withMessage("this field must be email"),
  check("phone")
    .isMobilePhone("ar-EG")
    .withMessage("invalid phone number ")
    .optional(),
  check("profileImage").optional(),
  check("role").optional(),
  validatorMiddleware,
];
const changePasswordValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid user ID"),

  check("currentPassword")
    .notEmpty()
    .withMessage("Current password field is required"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation is required"),

  check("password")
    .notEmpty()
    .withMessage("New password field is required")
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isMatch) {
        throw new Error("Incorrect  password");
      }
      if (val !== req.body.confirmPassword) {
        throw new Error("incorrect confirm password");
      }
      return true;
    }),

  // Apply validation result middleware
  validatorMiddleware,
];

const deleteUserValidator = [
  // rules
  check("id").isMongoId().notEmpty().withMessage("invalid user id "),
  validatorMiddleware,
];

module.exports = {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changePasswordValidator,
};
