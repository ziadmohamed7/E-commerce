const mongoose = require('mongoose')

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'subcategory name is required '],
      unique: [true, 'subcategory name must be unique '],
      minlength: [2, 'Too short name length!'],
      max_length: [32, 'Too much name length !'],
      trim: true
    },
    slug: {
      type: String,
      lowercase: true
    },
    // parent FOREIGN KEY
    category: {
      type: mongoose.Schema.ObjectId,
      // reference in database
      ref: 'Category',
      required: [true, 'Subcategory must belong to a parent category!']
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Subcategory', subcategorySchema)
