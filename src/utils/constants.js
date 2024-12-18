const constants = {
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    TOO_MANY_REQUESTS: 429,
    VALIDATION_ERROR: 422
  },
  ERROR_MESSAGES: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
    VALIDATION_ERROR: 'Validation error'
  },
  ROUTES: {
    API: '/api',
    HEALTH: '/health',
    USERS: '/users',
    DOCS: '/api-docs'
  }
};

module.exports = constants; 