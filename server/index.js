//starting up express onto server
const express = require('express');
const bodyParser = require('body-parser'); //parses incoming req
const data = require('../database-mongo');
const app = express();

//import google oauth passport package
const passport = require('passport'),
      auth = require('./auth.js');

//import cookie package
const cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');


app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

auth(passport);
app.use(passport.initialize());
//keep key secret so cookie don't get stoled by 3rd parties
app.use(cookieSession({name: 'session', keys: ['810']}));
app.use(cookieParser());


//google api console get req
  //client id: 742940875432-d88m20e2l2110l3m3jd24ag46v2a3pbm.apps.googleusercontent.com
  //callback: http://localhost:3000/auth/google/callback
  //client secret: LfaK1hn8P-3KDjsIAdv9tWQf
  //then do post req when user confirms google authentication

//redirects client to google login page
app.get('/', (req, res) => {
  if (req.session.token) { //if token exists
    res.cookie('token', req.session.token); //set cookie
    res.json({
        status: 'session cookie set'
    });
  } else {
    res.cookie('token', '') //cookie is not set
    res.json({
        status: 'session cookie not set'
    });
  }
});

//redirects client to google login page
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

//set the cookie session when user is logged in
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/'); //takes client to '/'
  }
);

//google log out
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null; //delete the set cookie
    res.redirect('/');
});

//overall, there are two get requests, note** need list of endpoints
//get request for user info (includes email, global score, and score for each attempted quiz)
app.get('/endpoint-for-user-change-l8r', function (req, res) {
  //fetch info from database (.retrieve name may vary l9r)
  data.retrieve(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send('getting user info...');
    }
  });
});

//get request for quizzes
app.get('/endpoint-for-quiz-change-l8r', function (req, res) {
  //fetch info from database (.retrieve name may vary l9r)
  data.retrieve(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send('fetching quiz...')
      // res.json(data);
    }
  });
});

//post req to update tally at end of quiz for attempted quiz
app.post('/endpoint-for-user-change-l8r', function(req, res) {
  //we have info of username, quiz name, and score
  var quizComplete = req.body;

  //save info to database (.save name may vary l8r)
  data.save(quizComplete);
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

