const logger = require('../config/logger');
const AppError = require('../utils/AppError');
const constants = require('../utils/constants');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, constants.STATUS_CODES.BAD_REQUEST);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, constants.STATUS_CODES.BAD_REQUEST);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, constants.STATUS_CODES.BAD_REQUEST);
};

const handleJWTError = () => 
  new AppError('Invalid token. Please log in again!', constants.STATUS_CODES.UNAUTHORIZED);

const handleJWTExpiredError = () => 
  new AppError('Your token has expired! Please log in again.', constants.STATUS_CODES.UNAUTHORIZED);

const sendErrorDev = (err, res) => {
  logger.error('Error:', {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    logger.error('Operational Error:', {
      status: err.status,
      message: err.message
    });

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    logger.error('Programming Error:', err);

    res.status(constants.STATUS_CODES.INTERNAL_ERROR).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || constants.STATUS_CODES.INTERNAL_ERROR;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
}; 