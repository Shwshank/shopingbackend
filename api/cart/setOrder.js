const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const setOrder = express.Router();
const OrderModel = require('../../model/orderModel');

setOrder.post('/', (req,res)=>{

  var data = new OrderModel() ;
  data =  req.body;
  console.log(data);
  OrderModel.newOrder(data, (err, order) => {
    if(err){
      res.send('error -> '+err);
    }else{
      res.send('Order placed -> '+order);
    }
  });

});

setOrder.post('/delete', (req,res)=>{

  var id =  req.body.id;
  console.log(id);
  OrderModel.deleteOrder(id, (err, order) => {
    if(err){
      res.send('error -> '+err);
    }else{
      res.send('Order deleted -> '+order);
    }
  });

});


module.exports = setOrder;
