const mongoose = require("mongoose");

// 1- schema 

const categorySchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true, "category name is required "],
        unique:[true ,"category name must be unique "],
        max_length : [32 , "too long category name "],
        minlength : [3 , "too short category name "]
    },
    // slug replace space with -
    slug:{
        type:String,
        lowercase:true
    },
    image : String
}, // timestamp record time 
{ timestamps: true } 
);

// 2- model

module.exports = mongoose.model("category" ,categorySchema );

