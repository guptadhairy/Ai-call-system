const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const securityMiddleware = {
  // Configure Helmet security headers
  helmetConfig: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),

  // Configure compression
  compressionConfig: compression({
    level: 6,
    threshold: 100 * 1000, // 100kb
  }),

  // Cookie parser
  cookieParserConfig: cookieParser(),
};

module.exports = securityMiddleware; 