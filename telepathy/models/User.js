var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitterId: {type: String, required: true, unique : true},
	username: {type: String, required: true, unique : true},
	email: {type:String},
	password: {type: String},
	displayName: String,
	token: String,
	tokenSecret: String,
	photos: [],
	_json: Schema.Types.Mixed
});

module.exports = mongoose.model('User', User);