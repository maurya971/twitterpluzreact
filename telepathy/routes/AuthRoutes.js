
const express = require("express");
const router = express.Router();
const passport = require('passport');
const authenticate = require("../auth/authenticate");

router.get('/login', (req, res) => {
    res.send('login');
  });



router.get('/login/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  

  
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
  	//res.redirect('/auth/login');
    res.redirect('http://localhost:3000/home?twitterId='+arguments[0].user.twitterId);
  });


router.get('/isAuthenticated', function(req, res){
    if (req.isAuthenticated()) {
      req.user.success = true;
      res.send(req.user);
    } else {
      res.send({
      "success": false
    });
    }
    
  });

/**
 * Handle signout routes
 */
router.post('/logout', (req, res) => {
	res.send("Logout");
});

module.exports = router;
