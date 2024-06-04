const { check } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/validationMiddleware')

const getSubcategoryValidator = [
  check('id').isMongoId().notEmpty().withMessage('wrong id !'),
  validatorMiddleware
]

const createSubcategoryValidator = [
  check("category")
    .isMongoId()
    .withMessage(" invalid category id format !")
    .notEmpty()
    .withMessage("category of subcategory is required !"),
  check("name")
    .notEmpty()
    .withMessage("name of subcategory is required and cant be empty !")
    .isLength({ min: 2, max: 32 })
    .withMessage("name length should be between 3 and 32 character ")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

const updateSubcategoryValidator = [
  check('id').isMongoId().notEmpty().withMessage('wrong id !'),
  check("name").optional().custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware
]

const deleteSubcategoryValidator= [
  check('id').isMongoId().notEmpty().withMessage('wrong id !'),
  validatorMiddleware
]

module.exports = { getSubcategoryValidator, createSubcategoryValidator, updateSubcategoryValidator ,deleteSubcategoryValidator}
