var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dinosaurs');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  email: String,
  globalScore: {type: Number, default: 0},
  attempts: [
    {
      quizName: String,
      score: Number
    }
  ]
});

var User = mongoose.model('User', userSchema);

// Save user data
var saveUser = function(info, callback) {
  var newUser = new User(info);
  newUser.save(function(err, savedEntry) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, savedEntry);
    }
  })
};

var quizSchema = mongoose.Schema({
  creator: String,
  quizzes: [
    {
      quizName: String,
      questions: [
        {
          text: String,
          options: [String],
          correctAnswer: String,
        }
      ],
    }
  ]
});

var Quiz = mongoose.model('Quiz', quizSchema);

// Save quiz data
var saveQuiz = function(info, callback) {
  var newQuiz = new Quiz(info);
  newQuiz.save(function(err, savedEntry) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, savedEntry);
    }
  })
};

// Find by quiz name and return object with with quiz name and quiz questions
var returnQuiz = function(query) {
  Quiz.find({'quizzes.quizName': query}, function(err, results) {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  })
};

// Update quiz score and increment global score
var incrementScore = function(email, quizName, points) {
  User.findOneAndUpdate({
    'email': email}, {
    $inc: {'globalScore': points},
    $push: {
      'attempts': {
        'quizName': quizName,
        'score': points
      }
    }
  }, function(err, updatedEntry) {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, updatedEntry);
    }
  })
};

// Returns leaderboard (an array with objects) with ten highest scores in descending order
var leaderboardScore = function() {
  User.find({}, function(err, results){
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  })
  .sort('-globalScore')
  .limit(10);
};

module.exports.saveUser = saveUser;
module.exports.saveQuiz = saveQuiz;
module.exports.returnQuiz = returnQuiz;
module.exports.incrementScore = incrementScore;
module.exports.leaderboardScore = leaderboardScore;