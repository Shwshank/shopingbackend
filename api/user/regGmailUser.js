const express = require ('express');
const regGmailUser = express.Router();

regGmailUser.get('/user', (req,res)=>{

  res.send('Gmail User user works');

});

module.exports = regGmailUser;
