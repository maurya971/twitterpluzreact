const Twitter = require('twitter');
const express = require('express');
const router = express.Router();
const config = require("../config/config");

router.get('/getTimeline'/*, require('connect-ensure-login').ensureLoggedIn()*/, function(req, res){
	let token = req.param("token");
	let tokenSecret = req.param("tokenSecret");
	let client = new Twitter({
	  consumer_key: config.consumer_key,
	  consumer_secret: config.consumer_secret,
	  access_token_key: token,
	  access_token_secret: tokenSecret
	});
	
	client.get('statuses/home_timeline', function(error, tweets, response) {
	  if(error) throw error;
	  var data = {
					'success': true,
					'message' : "user detail found successfully",
					'data': tweets
			};
			res.json(data);
	});
});

router.post('/postTweet', /*require('connect-ensure-login').ensureLoggedIn(),*/ function(req, res){
	console.log("In TwitterRoute/getTimeline");
	let token = req.param("token");
	let tokenSecret = req.param("tokenSecret");
	let tweetMsg = req.param("tweetMsg");
	
	let client = new Twitter({
		consumer_key: config.consumer_key,
		consumer_secret: config.consumer_secret,
		access_token_key: token,
		access_token_secret: tokenSecret
	});
	client.post('statuses/update', {status: tweetMsg},  function(error, tweet, response) {
	  if(error) throw error;
	  var data = {
					'success': true,
					'message' : "user detail found successfully",
					'data': tweet
			};
			res.json(data);
	});
});


module.exports = router;