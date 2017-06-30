const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const setCategory = express.Router();
const cateModel = require('../../model/cateModel');

let newCate = new cateModel();
let delCate = new cateModel();
var message = {};

setCategory.post('/', (req,res)=>{

  newCate = new cateModel({
    cateId: req.body.cateId,
    cateName: req.body.cateName,
  	cateDescription:  req.body.cateDescription,
  	cateImageUrl:  req.body.cateImageUrl,
    cateData:  req.body.cateData
	});

  cateModel.addNewCate(newCate,(err,msg) => {
      if(err){
        res.send("error -> "+err);
      }else {
        res.send("Category inserted");
      }
  })
});

setCategory.post('/delete', (req,res)=>{

  delCate = new cateModel({
    cateId: req.body.cateId
  });

  cateModel.deleteCate(delCate,(err,msg) => {
    if(err){
      res.send("error -> "+err);
    }else {
      res.send("Category deleted");
    }
  });

});

module.exports = setCategory;
