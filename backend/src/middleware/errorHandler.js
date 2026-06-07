function notFound(request, response, next) {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  response.status(404);
  next(error);
}

function errorHandler(error, _request, response, _next) {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;

  response.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
}

export { notFound, errorHandler };