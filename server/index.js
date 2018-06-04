//starting up express onto server
var express = require('express');
var bodyParser = require('body-parser'); //parses incoming req
var data = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParse.json());
app.use(bodyParser.urlencoded({extended: true}));


//google api console get req
  //then do post req when user confirms google authentication


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

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

