const mongoose = require('mongoose');

const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const promisify = require('es6-promisify');

const Question = require('../handlers/objectCreate').Question;

exports.register = async (req, res, next) => {
  const user = await new User({
    id: req.body.id,
    name: req.body.name,
    branch: req.body.branch
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};
  
exports.home = (req, res) => {
  res.render('home');
};

exports.welcome = (req, res) => {
  res.render('startTest');
};

exports.startTest = async (req, res) => {

  const questionSet = await Admin.getQuestions();
  const question = questionSet.map(element => 
    new Question(element.question, element.options, element.optionCorrect)
  );
  
  res.render('test', { questions: encodeURIComponent(JSON.stringify(question)) });
};


exports.getScore = async (req, res) => {
  var sid = req.body.id;
  const user = await User.findOne({id:sid}).select('score');
  if(!user){
    req.flash('error', 'User not found');
    res.redirect('/');
  }
  const string = encodeURIComponent(user.score);
  res.redirect('/get-score?valid=' + string);
}

exports.renderScore = (req, res) => {
  const score = parseInt(decodeURIComponent(req.query.valid));
  res.render('home', {score});
}

exports.saveScore = async (req, res, next) => {
  const user = req.user;
  const mark = parseInt(req.params.score);
  console.log(mark);

  await User.findOneAndUpdate(
    { _id: user._id }, 
    { $set: { score: mark } },
    { new: true , // return the new store  instead of the old one
      runValidators: true
    }).exec();
  debugger;
  next();
}

// async function testComplete(user) {
  // res.render('testComplete', { marks : mark });
// }
