const {
  sendErrorForDev,
  handelInvalidJsonWebTokenError,
  sendErrorForPro,
} = require("./globalMiddleware");

const globalMiddleware = (err, req, res, nex) => {
  // add default values
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  // eslint-disable-next-line eqeqeq
  if (process.env.NODE_ENV == "development") {
    // eslint-disable-next-line no-use-before-define
    sendErrorForDev(err, res);
  } else {
    // eslint-disable-next-line no-use-before-define
    if (err.name == "JsonWebTokenError") err = handelInvalidJsonWebTokenError();
    // eslint-disable-next-line no-use-before-define
    sendErrorForPro(err, res);
  }
};
exports.globalMiddleware = globalMiddleware;
