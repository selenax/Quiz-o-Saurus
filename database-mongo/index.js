var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  creator: String,
  quizzes: String
});

var User = mongoose.model('User', userSchema);

var quizSchema = mongoose.Schema({
  email: String,
  globalScore: Number, // Will this need to auto-increment?
  attempt: String
});

var Quiz = mongoose.model('Quiz', quizSchema);

var save = function(model, info) {
  var newEntry = new database(info);
  newEntry.save(function(err, savedEntry) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, savedEntry);
    }
  })
};

var selectAll = function(model, callback) {
  model.find({}, function(err, entries) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, entries);
    }
  });
};

var incrementScore = function() {
// increment
};

module.exports.save = save;
module.exports.selectAll = selectAll;
module.exports.incrementScore = incrementScore;