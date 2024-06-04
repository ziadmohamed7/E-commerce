// check have(body,param)
const { check } = require('express-validator')
const slugify = require('slugify');
const validatorMiddleware = require("../../middleware/validationMiddleware");

const getCategoryValidator = [
  check('id').isMongoId().notEmpty().withMessage('invalid category id '),
  validatorMiddleware
]

const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name of category is required and cant be empty !")
    .isLength({ min: 3, max: 32 })
    .withMessage("name length should be between 3 and 32 character ")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

const updateCategoryValidator = [
  // rules
  check('id').isMongoId().notEmpty().withMessage('invalid category id '),
  check("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
]

const deleteCategoryValidator = [
  // rules
  check('id').isMongoId().notEmpty().withMessage('invalid category id '),
  validatorMiddleware
]

module.exports = {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator
}
