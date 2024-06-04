// check have(body,param)
const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleware/validationMiddleware");

const getBrandValidator = [
  check("id").isMongoId().notEmpty().withMessage("invalid brand id "),
  validatorMiddleware,
];

const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("name of brand is required and cant be empty !")
    .isLength({ min: 3, max: 32 })
    .withMessage("name length should be between 3 and 32 character ").custom((val,{req})=>{
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

const updateBrandValidator = [
  // rules
  check("id").isMongoId().notEmpty().withMessage("invalid brand id "),
  check("name").optional().custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

const deleteBrandValidator = [
  // rules
  check("id").isMongoId().notEmpty().withMessage("invalid brand id "),
  validatorMiddleware,
];

module.exports = {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
};
