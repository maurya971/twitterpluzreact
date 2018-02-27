const User = require("../models/User.js");

/**
	Return user by twitterId
*/
exports.findUserByTwitterId = function(twitterId, next) {
	User.findOne( {"twitterId": twitterId }, 
		function(err, user) {
			if (err) {
				next(err);
			} else {
				next(null, user);
			}
    });	
};

/**
	create new User
*/
exports.createUser = function(userObj, token, tokenSecret, next) {
	userObj.twitterId = userObj.id;
	userObj.token = token;
	userObj.tokenSecret = tokenSecret;
	delete userObj.id;
	var user = User(userObj);
	user.save(function(err, savedUser){
		if(err){
			next(err);
		}
		else{
			next(null, savedUser);
		}
	});
};

/**
	Return userdetail by Id
*/
exports.getUserDetailById = function(id, next) {
	User.findById(id, function (err, user) {
		if (err) {
			next(err, null);
		} else {
			next(null, user);
		}
	});
};
