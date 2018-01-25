const mongoose = require('mongoose');
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');

exports.adminDashboard = (req, res) => {
    res.render('dashboard');
}

exports.deleteAllUser = async (req, res) => {
  await User.remove({});
  res.send("Deleted All!");
}

exports.deleteUser = async (req, res) => {
  await User.findByIdAndRemove({_id : req.params.id});
  res.redirect('/users');
}


exports.addQuestion = async (req, res) => {
  const question = {   
    question: req.body.question,
    options: [req.body.option1,
              req.body.option2,
              req.body.option3,
              req.body.option4],
    optionCorrect: req.body.optionCorrect
  };

  const newQuestion = new Admin(question);
  await newQuestion.save();
  
  res.send(newQuestion);
}

exports.updateQuestion = async (req, res) => {
  const id = req.params.id;
  const question = await Admin.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true ,// return the new store  instead of the old one
    runValidators: true
  }).exec();
  res.send(question);
}

exports.deleteQuestion = async (req, res) => {
  await Admin.findByIdAndRemove({_id : req.params.id});
  res.redirect('/questions');
}

exports.deleteAllQuestion = async (req, res) => {
  await Admin.remove({});
  res.redirect('/questions');
}

exports.getQuestions = async (req, res) => {
  const questions = await Admin.find({});
  res.send(questions);
}

exports.getUsers = async (req, res) => {
  const user = await User.find({});
  res.send(user);
}

