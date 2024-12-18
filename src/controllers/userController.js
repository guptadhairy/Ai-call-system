const BaseController = require('./baseController');
const User = require('../models/User');

class UserController extends BaseController {
  constructor() {
    super(User);
  }

  // Add any user-specific methods here
}

module.exports = new UserController(); 