// const fs = require('fs');
// // eslint-disable-next-line import/no-extraneous-dependencies
// require('colors');
// require("dotenv").config();
// const Product = require('../../models/productModel');
// const dbConnection = require('../../config/connect');

// // connect to DB
// dbConnection();

// // Read data
// const products = JSON.parse(fs.readFileSync('./products.json'));


// // Insert data into DB
// const insertData = async () => {
//   try {
//     await Product.create(products);

//     console.log('Data Inserted'.green.inverse);
//     process.exit();
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Delete data from DB
// const destroyData = async () => {
//   try {
//     await Product.deleteMany();
//     console.log('Data Destroyed'.red.inverse);
//     process.exit();
//   } catch (error) {
//     console.log(error);
//   }
// };

// // node seeder.js -d
// if (process.argv[2] === '-i') {
//   insertData();
// } else if (process.argv[2] === '-d') {
//   destroyData();
// }

require("dotenv").config(); // Load environment variables at the top
const mongoose = require("mongoose");
const dbConnection = require("../../config/connect");
const subcategoryModel = require("../../models/subcategoryModel"); // Adjust the path as needed

const seedData = async () => {
  try {
    await dbConnection(); // Ensure the connection function is called

    // Your seeding logic here
    console.log("Seeding data...");

    // Example dummy data deletion
    await subcategoryModel.deleteMany({});
    console.log("Dummy data deleted successfully");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

if (process.argv[2] === "-d") {
  seedData(); // Call the seeding function
}

