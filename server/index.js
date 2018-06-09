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

let port = process.env.PORT || 3000;
//google api console get req
  //client id: 742940875432-d88m20e2l2110l3m3jd24ag46v2a3pbm.apps.googleusercontent.com
  //callback: http://localhost:3000/auth/google/callback
  //client secret: LfaK1hn8P-3KDjsIAdv9tWQf
  //then do post req when user confirms google authentication

//------------google oauth------------//
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

//after google verifyes from func line 50, this func gets invoked immediately
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    req.session.token = req.user.token; //cookie?
    res.redirect('/'); //takes client to '/'
  }
);

//find a way to let front end know that user is logged in currently (or if current cookie exists)
//find out how to create expiry session

//google log out
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null; //delete the set cookie
    res.redirect('/');
});
//------------google oauth end------------//


//maybe have to do post when client creates an account
  //store email to database
  //extract
app.post('/endpoint-for-user-change-l8r', function(req, res) {
  //???
});



//list of endpoints
//user

//overall, there are two get requests

//get request for user info (includes email, global score, and score for each attempted quiz)-  this is for rendering scores on leaderboard
app.get('/home/leaderboard', function(req, res) {
  //fetch info from database
  data.leaderboardScore(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      console.log('get request is going through yay!')
      res.send(data);
    }
  });
});

//get request for quizzes - this is for rendering quiz under a SPECIFIC TOPIC
app.get('/home/quizzes', function(req, res) {
  //fetch info from database (.retrieve name may vary l9r)
  data.returnQuiz(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send('fetching quiz...');
      // res.json(data);
    }
  });
});

//patch req which is a single score w that quiz name
app.patch('/home/:email', function(req, res) {
  console.log('oi');

  //create variable to extract id, quiz score, and quiz name
  var email = req.params.email; //middleware?


  //----harcoded example----//
  var quizName = 'fashion'
  var points = 9
  //----harcoded example end----//

  //use incrementScore func from db
    //this saves local scores in user info as well as increasing the global score on leaderboard info
  data.incrementScore(email, quizName, points, function(err, data) {
    if(err) {
      console.log('boo hoo, didt work');
    } else {
      console.log('successfully saved scores!');
    }
  });
});

app.listen(port, () => {
  console.log(`YAY listening on port ${port}!!`);
});