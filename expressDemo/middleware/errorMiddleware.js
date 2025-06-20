import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = 500;

  console.log("inside the errorHandler");
  // Include request method and URL for more detailed logs
  logger.error({
    message: err.message,
    statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    stack: err.stack,
  });

  res.status(500).json({
    error: {
      message: err.message + "from error handler" || "Internal Server Error",
    },
  });
};
// err : error object thrown by the middleware or route handler
// req : request object
// res : response object
// next : next middleware or route handler
export default errorHandler;
