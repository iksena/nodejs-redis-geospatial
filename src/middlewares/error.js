const errorMiddleware = (error, req, res, _) => {
  const errorResponse = {
    message: error.message || 'Something went wrong',
    statusCode: error.statusCode || 500,
  };

  return res.status(errorResponse.statusCode).json(errorResponse);
};

export default errorMiddleware;
