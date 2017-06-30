const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const getOrder = express.Router();
const OrderModel = require('../../model/orderModel');

getOrder.post('/', (req,res)=>{

  var  userId = req.body.userId

  OrderModel.getOrder(userId, (err, Order) => {
    if(err){
      res.send('error -> '+err);
    }else{
      res.send('Order data -> '+Order);
    }
  });

});

module.exports = getOrder;
