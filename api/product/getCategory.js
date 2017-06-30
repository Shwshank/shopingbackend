const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const getCategory = express.Router();
const cateModel = require('../../model/cateModel');

getCategory.get('/allCategory', (req,res)=>{

  cateModel.getAllCategory((err,product) => {
    if(err){
      res.send('error -> '+err);
    }else{
      res.send('Category -> '+product)
    }
  });

});

getCategory.post('/findById', (req,res)=>{

    var id = req.body._id;

    cateModel.getCategoryById(id, (err,product) => {
      if(err){
        res.send("error -> "+err);
      }else{
        res.send("Category -> "+product);
      }
    });

  });

module.exports = getCategory;
