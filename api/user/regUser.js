const express = require ('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const regUser = express.Router();
const regModel = require('../../model/regModel');
const sendEmail = require('../../util/sendEmail');

let newUser = new regModel();
var message = {};

regUser.post('/user', (req,res)=>{

  newUser = new regModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		loginStatus: "0"
	});


  regModel.addNewUserMainFun(newUser)
  .then(function(result) {
    res.send(result)
  })
});

module.exports = regUser;
