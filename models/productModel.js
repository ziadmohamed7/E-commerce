const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required !"],
      trim: true,
      minlength: [3, "too short length!"],
      // maxlength=[150,"too long length!"]
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Image cover is required !"],
    },
    images: [String],
    desc: {
      type: String,
      required: [true, "Product description is required !"],
      max_length: [500, "Product description"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price before sale is required !"],
      trim: true,
      max: [20000, "Too long product price !"],
    },
    priceAfterSale: {
      type: Number,
      trim: true,
    },

    ratingAvg: {
      type: Number,
      required: [true, "rating average is required! "],
      min: [1, "rating must be above or equal to 1"],
      max: [5, "rating must be less or equal to 5"],
    },

    ratingQuantity: {
      type: Number,
      default: 0,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "Name of category that product belong to is required!"],
    },

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { timestamps: true }
);


// mongoose pre middleware for population using normal function not callback
productSchema.pre(/^find/,function (next){
  this.populate({
    path:'category',
    select:'name -_id'
  });
  next();
})

module.exports = mongoose.model("Product", productSchema);
