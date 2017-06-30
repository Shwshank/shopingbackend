const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const setProduct = express.Router();
const productModel = require('../../model/prodModel');

let newProduct = new productModel();
let delProduct = new productModel();
var message = {};

setProduct.post('/', (req,res)=>{

  newProduct = new productModel({
    productId: req.body.productId,
  	productName: req.body.productName,
    productCategory: req.body.productCategory,
    productCost: req.body.productCost,
    productData: req.body.productData,
  	productDescription: req.body.productDescription,
  	productPrimaryImageUrl: req.body.productPrimaryImageUrl,
    productSecondaryImageUrl: {
      SecondaryImageUrl1: req.body.productSecondaryImageUrl.SecondaryImageUrl1,
      SecondaryImageUrl2: req.body.productSecondaryImageUrl.SecondaryImageUrl2,
      SecondaryImageUrl3: req.body.productSecondaryImageUrl.SecondaryImageUrl3,
      SecondaryImageUrl4: req.body.productSecondaryImageUrl.SecondaryImageUrl4,
    }
	});

  productModel.addNewProduct(newProduct,(err,msg) => {
      if(err){
        res.send("error -> "+err);
      }else {
        res.send("Product inserted");
      }
  })
  });

  setProduct.post('/delete', (req,res)=>{

  delProduct = new productModel({
    productId: req.body.productId
  });

  productModel.deleteProduct(delProduct,(err,msg) => {
    if(err){
      res.send("error -> "+err);
    }else {
      res.send("Product deleted");
    }
  });

});

module.exports = setProduct;
