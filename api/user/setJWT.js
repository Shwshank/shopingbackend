const express = require ('express');
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

const setJWT = express.Router();
const config = require('../../config/const');

module.exports.JWTmessage = (person) => {
  return new Promise(function(resolve, reject){
		var msg;
    var message = {};
		msg = {
		  	"name": person.name,
		   	"email": person.email,
		   	"status": person.loginStatus
		};

			const token = jwt.sign(msg , config.JWTkey, {
					expiresIn : 604000 // 1 week;
				});

			message = {
					success : true,
					token : 'JWT '+token,
					name: person.name,
					email: person.email,
					loginStatus: person.loginStatus
			};
      resolve(message)
      reject(error)
		});
}

//module.exports = setJWT;
