const express = require ('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const regFbUser = express.Router();
const regModel = require('../../model/regModel');
const config = require('../../config/const');

require('../../util/passport');

regFbUser.get('/user', passport.authenticate('facebook', {scope:['email']}));

regFbUser.get('/user/fbcallback',
  passport.authenticate('facebook', { successRedirect: 'https://profileminion.firebaseapp.com',
                                      failureRedirect: 'https://www.google.com/' }),
  function(req, res) {

    var msg;
    msg ={
    	//"_id": req.user._id,
    	"name": req.user.name,
    	"email": req.user.email,
    	"status": req.user.loginStatus
    };

    //console.log(msg);

    const token = jwt.sign(msg, config.JWTkey, {
    	expiresIn : 604000 // 1 week;
    });

	var jwtToken = 'JWT '+token;
	res.send(jwtToken);
});

module.exports = regFbUser;
