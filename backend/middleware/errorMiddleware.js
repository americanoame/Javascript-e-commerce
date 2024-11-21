const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}


const errorHandler = (err, req, res, next) => {

  
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err); // Pass to the default Express error handler
  }

  

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // check  for Mongoose bad ObjectId
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Resource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? "🏌🏾" : err.stack
    })
}

export { notFound, errorHandler }