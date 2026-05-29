import env from "../../config/env.js";

const globalErrorHandler = (err, req, res, next) => {
  console.log(`[CRASH CAUGHT] : ${err.message}`);
  console.log(err.stack);

  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already in use, please use another one`;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid data format provided for the field ${err.path}`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    const errMessage = Object.values(err.errors).map(val => val.message);
    message = `Invalid input data: ${errMessage.join(", ")}`;
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token! Please login again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token Expired! Please login again";
  }

  if (err.name === "NotBeforeError") {
    statusCode = 401;
    message = "Token is not active yet";
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: env.NODE_ENV === "development" ? err.stack : null,
  });
};

export {globalErrorHandler};
