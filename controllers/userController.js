const mongoose = require('mongoose');
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const promisify = require('es6-promisify');

exports.register = async (req, res, next) => {
  const user = await new User({
    id: req.body.id,
    name: req.body.name,
    branch : req.body.branch
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.displayThanks = async (req, res) => {
  res.render('registerThanks');
}
  
exports.home = (req, res) => {
  res.render('home');
}

exports.welcome = (req, res) => {
  var passedVariable = req.user.name;
  res.render('startTest', {name:passedVariable});
}


exports.startTest = async (req, res) => {
  const questions = await Admin.getQuestions;
  mark = 0;
  sessionStorage.setItem("questions", JSON.stringify(questions));
  res.redirect(`/test/1`);
}

exports.testPage = (req, res) => {
  const questionNo = parseInt(req.params.q);
  if(questionNo > 2) {
    res.redirect('/test/1');
  }
  questions = JSON.parse(sessionStorage.getItem("questions"));
  res.render('testPage', question[questionNo] );
}

exports.submitAnswer = async (req, res) => {
  const page = parseInt(req.params.q);
  const totalQuestions = 2;
  const questions = JSON.parse(sessionStorage.getItem("questions"));
  const question = questions[page];

  if( req.body.option.toString().trim() === question.optionCorrect){
    mark++;
    console.log('Correct Answer');
  } else {
    console.log('Wrong Answer');
  }
  if (page < totalQuestions) {
    //return the next question
    res.render(`/test/${page + 1}`);
  } else {
    //Update user score before logging out!
    await User.findOneAndUpdate(
      { _id: req.user._id }, 
      { $set: { score: mark } },
      { new: true , // return the new store  instead of the old one
        runValidators: true
      }).exec();
    res.render('testComplete', { marks : mark });
  } 
}


exports.getScore = async (req, res) => {
  var sid = req.body.id;
  const user = await User.findOne({id:sid}).select('score');
  if(!user){
    req.flash('error', 'User not found');
    res.redirect('/');
  }
  var string = encodeURIComponent(user.score);
  res.redirect('/?valid=' + string);
}



