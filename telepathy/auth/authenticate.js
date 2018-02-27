module.exports = function(req, res, next){
   // if user is authenticated in the session, carry on
   console.log("authenticate -> Inside");
    if (req.isAuthenticated()) {
    	console.log("authenticate -> Success");
    	 return next();
    }
    console.log("authenticate -> Failure");
    // if they aren't redirect them to the home page
   res.json({
      "status": "unauthorised"
    });
};