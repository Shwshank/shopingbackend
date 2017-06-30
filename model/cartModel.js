const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const config = require('../config/const');

const cartSchema = mongoose.Schema({
  userId: String,
  product: [{
    productId: String,
    productCost: String,
    productImageUrl: String,
  }]
});

const cartModel = module.exports = mongoose.model('cartSchema', cartSchema);

module.exports.addNewCart = (cart, callback) => {
  cartModel.findOneAndUpdate({ userId: cart.userId }, cart,{ upsert: true }, callback)
}

module.exports.addNewCartProduct = (cart, callback) => {
  var newProduct = {'productId' : cart.product[0].productId, 'productCost' : cart.product[0].productCost, 'productImageUrl' : cart.product[0].productImageUrl}
  cartModel.update({ userId: cart.userId }, { $push: {product: newProduct } } ,{ upsert: true }, callback)
}

module.exports.deleteCartProduct = (cart, callback) => {
  cartModel.update({ userId: cart.userId }, { $pull: {product: {productId : cart.productId } } } ,{ upsert: true }, callback)
}

module.exports.getCart = (userId, callback) => {
  cartModel.find({ "userId": userId }, callback);
}
