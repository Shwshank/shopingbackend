const express = require ('express');
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

const changeLoginStatus = express.Router();
const config = require('../../config/const');
const regModel = require('../../model/regModel');
const setJWT = require('./setJWT');

var message = {};

changeLoginStatus.get('/:id', (req,res)=>{

  let ciphertext = req.params.id+"";

  ciphertextToEmail(ciphertext).then((result)=>{
    checkStatus(result).then((output) => {
      res.send(output);
    })
    //res.send(result);
  })

});

function ciphertextToEmail(ciphertext){
  return new Promise(function(resolve, reject){

    let cText = ciphertext;

    cText = ciphertext.replace('aFaFa', '+' ).replace('bFbFb', '/').replace('cFcFc', '=');
		cText = ciphertext.replace('aFaFa', '+' );
		cText = ciphertext.replace('bFbFb', '/');
		cText = ciphertext.replace('cFcFc', '=');
		cText = ciphertext.replace('aFaFa', '+' ).replace('bFbFb', '/').replace('cFcFc', '=');

    let bytes  = cryptoJS.AES.decrypt(cText.toString(), '!@#secretKey#@!');
		let email = bytes.toString(cryptoJS.enc.Utf8);

    console.log(email);
    resolve(email);
    error(err);
  });
}

function checkStatus(email){
  return new Promise(function(resolve, reject){
    console.log("-> "+email);
    regModel.getUserByEmail(email,(err,user) => {
      //console.log(user);
        if(err){
          message = {
            status: "false",
            msg: "Something went wrong when pulling the records with email Id"
          }
          resolve(message)
          reject(error)
        }else{
          console.log(user);
          if(user.loginStatus == "0"){

            regModel.updateStatus1(email,(err,callback) => {});

            setJWT.JWTmessage(user).then((result)=> {
                resolve(result)
            });
              //resolve(message)
          }else{

            message = {
              status: "false",
              msg: "Opps! this link has been expired."
            }

            resolve(message)
          }
        }
    })

  });

}

module.exports = changeLoginStatus;
