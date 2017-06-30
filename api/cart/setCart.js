const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const setCart = express.Router();
const CartModel = require('../../model/cartModel');

let newCart = new CartModel();
var message = {};

setCart.post('/new', (req,res)=>{

  newCart = new CartModel({
    userId: req.body.userId,
    product: {
      productId: req.body.product.productId,
      productCost:  req.body.product.productCost,
      productImageUrl:  req.body.product.productImageUrl
    }
	});

  CartModel.addNewCart(newCart, (err,msg) => {
    if(err){
      //res.send("error in new cart -> "+err);
      CartModel.addNewCartProduct(newCart, (error, message) => {
        if(error){
          res.send("Error in updating cart -> "+error);
        }else{
          res.send("Cart Updated-> "+message);
        }
      });
    }else{
      res.send("Product added in cart -> "+msg);
    }
  });

});


setCart.post('/delete', (req,res)=>{

  var cart = {
    userId: req.body.userId,
    productId: req.body.productId
	};

  CartModel.deleteCartProduct(cart, (err,msg) => {
    if(err){
      res.send("error in  cart -> "+err);
    }else{
      res.send("Product removed form cart -> "+msg);
    }
  });

});

module.exports = setCart;
