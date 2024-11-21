const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch((error) => {
        if (!res.headersSent) {
          next(error); // Pass to error handler only if headers are not sent
        }
      });
  };
  
  export default asyncHandler;
  