const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const config = require('../config/const');

const cateSchema = mongoose.Schema({
  cateId: String,
	cateName: String,
	cateDescription: String,
	cateImageUrl: String,
  cateData: String
});

const cateModel = module.exports = mongoose.model('cateModel', cateSchema);

module.exports.addNewCate = (cateNew, callback) => {
	cateNew.save(callback);
}

module.exports.deleteCate = (delCate, callback) => {
  cateModel.remove({cateId:delCate.cateId},callback);
}

module.exports.getAllCategory = (callback) => {
  cateModel.find(callback);
}

module.exports.getCategoryById = (id, callback) => {
  cateModel.find({_id:id}, callback);
}
