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

let port = process.env.PORT || 3000;

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

//keep key secret so cookie can't b stolen by 3rd parties
app.use(cookieSession({name: 'session', keys: ['810']}));
app.use(cookieParser());

//after google verifyes from func line 50, this func gets invoked immediately
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    req.session.token = req.user.token; //cookie?
    res.redirect('/'); //takes client to '/' (homepage)
    console.log(req.user.profile)
    var googleId = req.user.profile.id;
    var displayName = req.user.profile.displayName;
    //check if user exists in database
    data.confirmUser(googleId, function(err, data) {
      if(err) { //if user doesn't exist in database
        console.log(`user doesn't exist, let's save it!`);
        //save first time user into database
        data.saveUser(googleId, displayName, function(err, data) {
          if(err) {
            console.log('not saving...');
          } else {
            console.log('new user is saved!!');
          }
        });
      } else { //if user already exists in database
        console.log('it already hereeeee!!!');
      }
    });
  }
);

//might not need this save user in google callback ^
//post req to database to create new user info
app.post('/endpoint-for-user-change-l8r', function(req, res) {
  //create new user info if user doesn't exist in database
  //find by email, if doesn't exist, create schema
});

//google log out
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null; //delete the set cookie
    res.redirect('/');
});
//------------google oauth end------------//


//get request for user info (includes email, global score, and score for each attempted quiz)-  this is for rendering scores on leaderboard
app.get('/home/leaderboard', function(req, res) {
  //fetch info from database
  data.leaderboardScore(function(err, data) {
    if(err) {
      console.log('not working')
      res.sendStatus(500);
    } else {
      console.log('get request is going through yay!')
      res.send(data);
    }
  });
});

//get request for quizzes - this is for rendering quiz under a SPECIFIC TOPIC
app.get('/home/quizzes', function(req, res) {
  //hardcoded first argument in returnQuiz (edit l8r if the name actualy shows in req)
  data.returnQuiz('dinosaur', function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      console.log('quiz information is fetched!');
      res.send(data);
    }
  });
});

//NOTE MAKE SURE TO CHANGE :EMAIL TO :GOOGLEID
//patch req which is a single score w that quiz name
app.patch('/home/:email', function(req, res) {
  console.log('oi');

  //create variable to extract id/email, quiz score, and quiz name
  var email = req.params.email; //middleware?

  //----harcoded example----//
  var quizName = 'fashion'
  var points = 9
  //----harcoded example end----//

  //use incrementScore func from db
    //this saves local scores in user info as well as increasing the global score on leaderboard info
  data.incrementScore(email, quizName, points, function(err, data) {
    if(err) {
      console.log('boo hoo, not working');
    } else {
      console.log('successfully saved scores!');
    }
  });
});

app.listen(port, () => {
  console.log(`YAY listening on port ${port}!!`);
});