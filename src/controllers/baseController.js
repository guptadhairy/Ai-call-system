const AppError = require('../utils/AppError');
const ApiResponse = require('../utils/apiResponse');
const constants = require('../utils/constants');
const mongoose = require('mongoose');

class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  // Validate MongoDB ObjectId
  validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid ID format', constants.STATUS_CODES.BAD_REQUEST);
    }
  };

  // Create a document
  create = async (req, res) => {
    try {
      const doc = await this.Model.create(req.body);
      return ApiResponse.success(res, doc, 'Created successfully', constants.STATUS_CODES.CREATED);
    } catch (error) {
      throw new AppError(error.message, constants.STATUS_CODES.BAD_REQUEST);
    }
  };

  // Get all documents
  getAll = async (req, res) => {
    try {
      const docs = await this.Model.find();
      return ApiResponse.success(res, docs, 'Retrieved successfully');
    } catch (error) {
      throw new AppError(error.message, constants.STATUS_CODES.INTERNAL_ERROR);
    }
  };

  // Get one document by ID
  getOne = async (req, res) => {
    try {
      this.validateObjectId(req.params.id);
      const doc = await this.Model.findById(req.params.id);
      if (!doc) {
        throw new AppError('Document not found', constants.STATUS_CODES.NOT_FOUND);
      }
      return ApiResponse.success(res, doc, 'Retrieved successfully');
    } catch (error) {
      if (error.isOperational) throw error;
      throw new AppError('Error retrieving document', constants.STATUS_CODES.INTERNAL_ERROR);
    }
  };

  // Update document
  update = async (req, res) => {
    try {
      this.validateObjectId(req.params.id);
      const doc = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!doc) {
        throw new AppError('Document not found', constants.STATUS_CODES.NOT_FOUND);
      }
      return ApiResponse.success(res, doc, 'Updated successfully');
    } catch (error) {
      if (error.isOperational) throw error;
      throw new AppError('Error updating document', constants.STATUS_CODES.BAD_REQUEST);
    }
  };

  // Delete document
  delete = async (req, res) => {
    try {
      this.validateObjectId(req.params.id);
      const doc = await this.Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        throw new AppError('Document not found', constants.STATUS_CODES.NOT_FOUND);
      }
      return ApiResponse.success(res, null, 'Deleted successfully');
    } catch (error) {
      if (error.isOperational) throw error;
      throw new AppError('Error deleting document', constants.STATUS_CODES.BAD_REQUEST);
    }
  };
}

module.exports = BaseController; 