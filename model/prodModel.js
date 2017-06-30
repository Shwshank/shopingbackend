const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const config = require('../config/const');

const productSchema = mongoose.Schema({
  productId: String,
	productName: String,
  productCategory: String,
  productCost: String,
  productData: String,
	productDescription: String,
	productPrimaryImageUrl: String,
  productSecondaryImageUrl: {
    SecondaryImageUrl1: String,
    SecondaryImageUrl2: String,
    SecondaryImageUrl3: String,
    SecondaryImageUrl4: String,
  }
});

const productModel = module.exports = mongoose.model('productSchema', productSchema);

module.exports.addNewProduct = (productNew, callback) => {
	productNew.save(callback);
}

module.exports.deleteProduct = (deleteproduct, callback) => {
  productModel.remove({ productId : deleteproduct.productId },callback);
}

module.exports.getAllProduct = (callback) => {
  productModel.find(callback);
}

module.exports.getProductById = (id, callback) => {
  productModel.find({_id:id}, callback);
}
