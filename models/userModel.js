const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    phone: String,
    profileImage: String,

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
    },
    active:{
        type:Boolean,
        default:true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// use mongoose middleware to make pre hash to password before save 
userSchema.pre("save",async function(next){
  // check if password is modified firstly or not 
  if(!this.isModified("password")) return next(); 
  // make hash 
  this.password = await bcrypt.hash(this.password,10);
  next()
});

module.exports = mongoose.model("User", userSchema);