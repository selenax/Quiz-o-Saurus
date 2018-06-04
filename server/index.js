//starting up express onto server
const express = require('express');
const bodyParser = require('body-parser'); //parses incoming req
const data = require('../database-mongo');

const app = express(),
      passport = require('passport'),
      auth = require('./auth.js');

auth(passport);

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());


//google api console get req
  //client id: 742940875432-d88m20e2l2110l3m3jd24ag46v2a3pbm.apps.googleusercontent.com
  //callback: http://localhost:3000/auth/google/callback
  //client secret: LfaK1hn8P-3KDjsIAdv9tWQf
  //then do post req when user confirms google authentication
app.get('/', (req, res) => {
    res.json({
        status: 'session cookie not set'
    });
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {}
);


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

