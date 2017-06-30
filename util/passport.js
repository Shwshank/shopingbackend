const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

const User = require('../model/regModel');
const config = require('../config/const');


module.exports = function(passport){

    let opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    // passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
    //
    //     //console.log("_________");
    //     //console.log(jwt_payload);
    //     //console.log("_________");
    //
    //     User.getUserByEmailID(jwt_payload.email, (err, user) =>{
    //             if (err) {
    //                 return done(err, false);
    //             }
    //             if (user) {
    //                 done(null, user);
    //             } else {
    //                 done(null, false);
    //             }
    //         });
    // }));
    //
    // passport.use(new GoogleStrategy({
    //         clientID: config.GOOGLE_CLIENT_ID,
    //         clientSecret: config.GOOGLE_CLIENT_SECRET,
    //         callbackURL: config.GOOGLE_CALLBACK
    //       },
    //       function(accessToken, refreshToken, profile, cb) {
    //
    //             console.log("_________");
    //             console.log(accessToken);
    //             console.log("_________");
    //
    //             process.nextTick( function(){
    //
    //                     User.findOne({ 'google.id': profile.id }, function (err, user) {
    //
    //                     if(user)
    //                         return cb(null,user);
    //                     else{
    //                         var newUser = new User();
    //
    //                         newUser.name = profile.displayName;
    //                         newUser.email = profile.emails[0].value;
    //                         newUser.status = "1";
    //                         newUser.google.id = profile.id;
    //                         newUser.google.token = accessToken;
    //                         newUser.google.name = profile.displayName;
    //                         newUser.google.email = profile.emails[0].value;
    //
    //                         newUser.save(function(err){
    //                             if(err){
    //                                 console.log("**********");
    //                                 console.log(err);
    //                                 console.log("**********");
    //                                 throw err;
    //                             }
    //                             return cb(null,newUser);
    //                         });
    //                     }
    //                     });
    //
    //             });
    //           }
    //     ));

    passport.use(new FacebookStrategy({
        clientID: config.fbAppID,
        clientSecret: config.fbAppSecret,
        callbackURL: config.fbcallbackURL,
        profileFields: config.profileFields
      }, (accessToken, refreshToken, profile, cb) => {

            process.nextTick( function(){

                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {

                    if(user)
                        return cb(null,user);
                    else{
                        var newUser = new User();

                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.status = "1";
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.displayName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save(function(err){
                            if(err){
                                console.log("**********");
                                console.log(err);
                                console.log("**********");
                                throw err;
                            }
                            return cb(null,newUser);
                        });
                    }
                    });

            });
          }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
