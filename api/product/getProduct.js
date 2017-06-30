const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const getProduct = express.Router();
const productModel = require('../../model/prodModel');

getProduct.get('/allProducts', (req,res)=>{

  productModel.getAllProduct((err,product) => {
    if(err){
      res.send('error -> '+err);
    }else{
      res.send('products -> '+product)
    }
  });

});

getProduct.post('/findById', (req,res)=>{

    var id = req.body._id;

    productModel.getProductById(id, (err,product) => {
      if(err){
        res.send("error -> "+err);
      }else{
        res.send("product -> "+product);
      }
    });

  });

module.exports = getProduct;
