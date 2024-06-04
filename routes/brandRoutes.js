const express = require("express");
const {getBrands,
       createBrand,
       getBrand,
       updateBrand,
       deleteBrand} = require('../controllers/brandController');

const {getBrandValidator , updateBrandValidator ,deleteBrandValidator,createBrandValidator} = require("../utils/validators/brandValidator");

const router = express.Router();

// routes
router.route('/').
post(createBrandValidator,createBrand).
get(getBrands);

router.route('/:id').
get( getBrandValidator , getBrand).
put(updateBrandValidator,updateBrand).
delete(deleteBrandValidator,deleteBrand);

module.exports = router;


