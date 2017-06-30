const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const config = require('../config/const');

const OrderSchema = mongoose.Schema({
  userId: String,
  userAddress: String,
  paymentMode: String,
  otherData: String,
  totalCost: String,
  orderStatus: String,
  product: [{
    productId: String,
    productCost: String,
    productImageUrl: String,
    productQuantity: String,
  }]
});

const OrderModel = module.exports = mongoose.model('OrderSchema', OrderSchema);

module.exports.newOrder = (Order, callback) => {
  OrderModel.findOneAndUpdate({userId:"0"}, Order,{ upsert: true }, callback)
}

module.exports.getOrder = (userId, callback) => {
  OrderModel.find({userId: userId}, callback);
}

module.exports.deleteOrder = (OrderId, callback) => {
  console.log(OrderId);
  OrderModel.remove({ _id : OrderId },callback);
}
