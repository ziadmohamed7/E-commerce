
const mongoose = require("mongoose");

require("dotenv").config();

const dbConnection = (async()=>{

    await mongoose.connect(process.env.DB_STRING);

    console.log(`Host : ${mongoose.connection.host}`);
    console.log(`Name : ${mongoose.connection.name}`);
});


module.exports = dbConnection;