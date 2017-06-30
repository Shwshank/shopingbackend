const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const getCart = express.Router();
const CartModel = require('../../model/cartModel');

getCart.post('/', (req,res)=>{

  var  userId = req.body.userId

  CartModel.getCart(userId, (err, cart) => {
    if(err){
      res.send('error -> '+err);
    }else{
      res.send('Cart data -> '+cart);
    }
  });

});

module.exports = getCart;
