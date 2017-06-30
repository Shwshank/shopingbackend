const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const config = require('../config/const');
const sendEmail = require('../util/sendEmail');

const regSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	loginStatus: String,
	facebook: {
		id: String,
		token: String,
		name: String,
		email:String
	},
	google: {
		id: String,
		token: String,
		name: String,
		email:String
	}

});

const regModel = module.exports = mongoose.model('regModel', regSchema);

module.exports.getUserById = function(id, callback){
  regModel.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email};
  regModel.findOne(query, callback);
}

module.exports.addUserDBFun = function(newUser, callback){
	bcrypt.genSalt(11, (err,salt) =>{
			if(err){
				console.log("Error1 "+err);
			}
		bcrypt.hash(newUser.password,salt,(err,hash) =>{
			if(err){
				console.log("Error2 "+err);
			}
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.addNewUserMainFun =  function(newUser){

  return new Promise(function(resolve, reject) {
		regModel.getUserByEmail(newUser.email,(err,user) => {
			if(user){
				message = {

					"success" : "false",
					"msg" : 'User already registered'

				};
				resolve(message)
				reject(err)
			}else{

			  regModel.addUserDBFun(newUser, (err,user) => {
			    //process.exit(0);
			    if(err){
			      console.log(err);
			      message = {

			        "success" : "false",
			        "msg" : 'Failed to register user'

			      };
			      resolve(message)
			      reject(err)
			    }
			    else{
			      //console.log("2");
				        message = {

					        "success" : "true",
					        "msg" : 'User registered'

					      };
				      //console.log(message);
				      sendEmail.welcomeEmail(newUser);
				      resolve(message)
				      reject(err)
			    	}
			  });
			}
		});
	})

}

module.exports.updateStatus1 = function(email, callback){

	//var query = { email: email };
	//User.update(query, { 'status': '1' }, options, callback)

	var conditions = { email: email }
		  , update = { $set: { loginStatus: '1' }}
		  , options = { multi: true };

	regModel.update(conditions, update, options, callback);
}
