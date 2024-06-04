require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const dbConnection = require('./config/connect');
const categoryRoute = require("./routes/categoryRoutes") ;
const ApiError = require("./utils/apiError");
const globalMiddleware = require('./middleware/globalMiddleware');
const subcategoryRoute = require("./routes/subcategoryRoute");
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require("./routes/productRoutes");
const userRoute = require('./routes/userRoute');
const authRoute = require("./routes/authRoute");

const app = express();

// connect with database
dbConnection();

// middlewares 
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}
app.use(express.json());

// mount routes 
app.use("/api/v1/categories", categoryRoute);
app.use('/api/v1/subcategories', subcategoryRoute);
app.use('/api/v1/brands' , brandRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

// one of errors that i should treat with route error if user want to go to route that not exit 
app.all('*',(req,res,next)=>{
    next(new ApiError(`can't find this route : ${req.originalUrl}` , 400));
});

// Global  error handling middlewares (4 params) for express
app.use(globalMiddleware);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT,()=>{
    console.log(`App running on port ${PORT} `);
});

// Handle errors outside express
// Events => list => callback() by listen to it using process.on
process.on('unhandledRejection' ,(err)=>{
    console.log(`UnhandledRejection error happened : ${err}`);
    server.close(()=>{
        console.log("Shutting down....");
        // make stop to program but i should firstly close server 
        process.exit(1);
    })
});

