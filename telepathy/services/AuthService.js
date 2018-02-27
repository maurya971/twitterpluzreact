const UserService = require("../services/UserService.js");

/**
 * Try to find user details based on twitterId if not create one
 */
exports.findOrCreateUser = function(user, token, tokenSecret, next) {
	console.log("AuthService -> findOrCreateUser, a user trying to enter with twitterId " + user.id);
	UserService.findUserByTwitterId(user.id, function(err, dbUser) {
		if (err) {
			console.log("AuthService -> findOrCreateUser, error in finding user");
		} else {
			if (dbUser) {
				console.log("AuthService -> findOrCreateUser, User found");
				next(null, dbUser);
			} else {
				console.log("AuthService -> findOrCreateUser, User not found, creating one");
				UserService.createUser(user, token, tokenSecret, function(err, newUser) {
					if (err) {
						next(err, null);	
					} else {
						next(null, newUser);
					}
				});
			}
		}
	});
};