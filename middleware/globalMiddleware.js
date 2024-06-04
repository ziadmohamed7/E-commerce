const ApiError = require("../utils/apiError");


const globalMiddleware = ((err,req,res,nex)=>{
    // add default values
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    // eslint-disable-next-line eqeqeq
    if(process.env.NODE_ENV=='development'){
        // eslint-disable-next-line no-use-before-define
        sendErrorForDev(err,res);

    }else{
        // eslint-disable-next-line no-use-before-define
        if (err.name === "JsonWebTokenError") err = handelInvalidJsonWebTokenError()
          // eslint-disable-next-line no-use-before-define
          sendErrorForPro(err, res);
    }
});
const handelInvalidJsonWebTokenError = () =>
  new ApiError("Invalid token , please login again.. ", 401);

const sendErrorForDev = (err,res)=>res.status(err.statusCode).json({ 
    status: err.status,
    error:err,
    message:err.message,
    stack : err.stack
 });


 const sendErrorForPro = (err,res)=>res.status(err.statusCode).json({ 
    status: err.status,
    message:err.message,
 });


module.exports = globalMiddleware;