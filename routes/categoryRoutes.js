const express = require("express");
const {getCategories,
       createCategory,
       getCategory,
       updateCategory,
       deleteCategory} = require("../controllers/categoryController");

const {getCategoryValidator , updateCategoryValidator ,deleteCategoryValidator,createCategoryValidator} = require("../utils/validators/categoryValidator");
const subcategoryRoute = require('./subcategoryRoute');
const authController = require("../controllers/authController");

const router = express.Router();


router.use("/:categoryId/subcategories", subcategoryRoute);
// routes
router
  .route("/")
  .post(authController.protect, createCategoryValidator, createCategory)
  .get(getCategories);

router.route('/:id').
get( getCategoryValidator , getCategory).
put(updateCategoryValidator,updateCategory).
delete(deleteCategoryValidator,deleteCategory);

module.exports = router;


