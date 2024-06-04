const { check } = require("express-validator");
const slugify = require("slugify");
const validationMiddleware = require("../../middleware/validationMiddleware");
const categoryModel = require("../../models/categoryModel");
const subcategoryModel = require("../../models/subcategoryModel");

const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short product title").custom((val,{req})=>{
      req.body.slug = slugify(val);
      return true;
    }),
  check("desc")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 500 })
    .withMessage(" Too long Product description"),
  check("quantity")
    .notEmpty()
    .withMessage("Quantity of product is required")
    .isNumeric()
    .withMessage(" Quantity of product should be numeric"),
  check("price")
    .notEmpty()
    .withMessage(" Price of product is required")
    .isLength({ max: 20000 })
    .withMessage("Too long price length")
    .isNumeric()
    .withMessage(" Price of product should be numeric"),
  check("ratingAvg")
    .notEmpty()
    .isNumeric()
    .withMessage("ratingAvg should be a numeric ")
    .withMessage("ratingAvg is required")
    .isLength({ min: 1, max: 5 })
    .withMessage("rating should be between 1 and 5"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("product quantity must be numeric"),
  check("priceAfterSale")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("product quantity must be numeric")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterSale must be lower than price");
      }
      return true;
    }),
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("subcategory id is not correct ")
    .custom(async (subcategories) => {
      const result = await subcategoryModel.find({
        _id: { $exists: true, $in: subcategories },
      });
      if (result.length !== subcategories.length) {
        throw new Error("Invalid subcategories ids ");
      }
      return true;
    })
    .custom(async (val, { req }) => {
      await subcategoryModel
        .find({ category: req.body.category })
        .then((subcategories) => {
          const subcategoriesId = [];
          subcategories.forEach((subcategory) => {
            subcategoriesId.push(subcategory._id.toString());
          });
          const checker = val.every((v) => subcategoriesId.includes(v));
          if (!checker) {
            throw new Error(
              "One or more subcategories ids doesn't belong to category id"
            );
          }
          return true;
        });
    }),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("category id is not correct ")
    .custom(async (categoryId) => {
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        throw new Error("Category ID is not correct");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("colors should be array of strings  "),
  check("brand").optional().isMongoId().withMessage("brand id is invalid "),
  check("images").optional().isArray().withMessage("images id is invalid "),
  check("imageCover").notEmpty().withMessage("Image cover is required"),
  validationMiddleware,
];

const getProductValidator = [
  check("id").isMongoId().notEmpty().withMessage("invalid product id"),
  validationMiddleware,
];

const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val, { lower: true, strict: true });
      return true;
    }),
  validationMiddleware,
];

const deleteProductValidator = [
  check("id").isMongoId().notEmpty().withMessage("invalid product id"),
  validationMiddleware,
];

module.exports = {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
