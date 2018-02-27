const express = require("express");
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const config = require("./config/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
var cookieParser = require('cookie-parser');

const app = express();
const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const twitterRoutes = require("./routes/TwitterRoutes");
//const PassportSetup = require("./config/PassportSetup");
const cors = require('cors');


const AuthService = require("./services/AuthService.js");
const UserService = require("./services/UserService.js");

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8086,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//connecting to mongodb
mongoose.connect(config.mongoUri); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
//app.use(session({ secret: config.secret }));
app.use(cookieParser());
app.enable('trust proxy');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
  cookie: {
    maxAge: 8640000000
  }
}));

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
    console.log("In passportsetup callback");
    //console.log(token);
    //console.log(tokenSecret);
    console.log(profile);
    AuthService.findOrCreateUser(profile, token, tokenSecret, function(err, profileFromDb) {
    	console.log("passportsetup -> User entered with twitterId" + profileFromDb.twitterId);
    	console.log(profileFromDb);
    	return cb(null, profileFromDb);
    });
  }));


passport.serializeUser(function(user, cb) {
  console.log("In passportsetup serializeUser");
  console.log(user);
  cb(null, user.twitterId);
});

passport.deserializeUser(function(twitterId, cb) {
  console.log("In passportsetup deserializeUser");
  console.log(twitterId);
  UserService.findUserByTwitterId(twitterId, function(err, userFromDb) {
    console.log("In passportsetup findUserByTwitterId");
    console.log(err);
    console.log(userFromDb);
    cb(null, userFromDb);
  });
});

//Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public/twitterpluzclient/build/asdf')));

//Setup routes
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/twitter", twitterRoutes);


//create home route
app.get("/", (req, res) => {
	res.end("Hello");
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
