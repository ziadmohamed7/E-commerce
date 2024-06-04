const mongoose = require("mongoose");

// 1- schema

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required "],
      unique: [true, "brand name must be unique "],
      max_length: [32, "too long brand name "],
      minlength: [3, "too short brand name "],
    },
    // slug replace space with -
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  }, // timestamp record time
  { timestamps: true }
);

// 2- model

module.exports = mongoose.model("brand", brandSchema);
