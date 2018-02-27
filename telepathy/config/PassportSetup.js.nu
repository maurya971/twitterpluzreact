//const express = require('express');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const AuthService = require("../services/AuthService.js");
const UserService = require("../services/UserService.js");

passport.use(new Strategy({
    consumerKey: 'QsHN4SAPCouY31bt9VArVOF8f',
    consumerSecret: 'RyQBuiJ93rKxROOkLpRG4CJJ9FvIVeOu7puSlnF7RPlA8BpVgl',
    callbackURL: 'http://localhost:8086/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    console.log("In passportsetup callback-----------------------------");
    //console.log(token);
    //console.log(tokenSecret);
    console.log(profile);
    var newUserWithSecrets = {
      "profile": profile,
      "token": token,
      "tokenSecret": tokenSecret
    };
    console.log(profile);
    AuthService.findOrCreateUser(newUserWithSecrets, function(err, profileFromDb) {
    	console.log("passportsetup -> User entered with twitterId" + profileFromDb.twitterId);
    	console.log(profileFromDb);
    	return cb(null, profileFromDb);
    });
  }));

passport.serializeUser(function(user, cb) {
	console.log("In passportsetup serializeUser");
  //console.log(user);
  	cb(null, user.twitterId);
});

passport.deserializeUser(function(twitterId, cb) {
	console.log("In passportsetup deserializeUser");
  //console.log(twitterId);
  UserService.findUserByTwitterId(twitterId, function(err, userFromDb) {
    console.log("In passportsetup findUserByTwitterId");
    //console.log(err);
    //console.log(userFromDb);
    cb(null, userFromDb);
  });
});