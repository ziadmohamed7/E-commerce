const express = require("express");
const {
  getSubcategories,
  createSubcategory,
  updateSpecificSubcategory,
  getSpecificSubcategory,
  deleteSpecificSubcategory,
} = require("../controllers/subcategoryController");
const {
  getSubcategoryValidator,
  createSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} = require("../utils/validators/subcategoryValidator");

// mergeParams allow me to access params in another router
const router = express.Router({mergeParams:true});

router
  .route("/")
  .get(getSubcategories)
  .post(createSubcategoryValidator, createSubcategory);
router
  .route("/:id")
  .get(getSubcategoryValidator, getSpecificSubcategory)
  .put(updateSubcategoryValidator, updateSpecificSubcategory)
  .delete(deleteSubcategoryValidator, deleteSpecificSubcategory);

module.exports = router;

// for validator there two steps first one is rules and second is middleware that get and display error if exit
