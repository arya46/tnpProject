const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


exports.login = passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: 'Failed login!',
    successRedirect: '/user/welcome',
    successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
    mark = 0;
    req.logout();
    req.flash('success', `You're now logged out!`);
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    //Passport middleware
    if(req.isAuthenticated()){
        next(); //logged in!
        return;
    }
    req.flash('error', 'Oops you must be logged in!');
    res.redirect('/');
}


exports.confirmedPasswords = (req, res, next) => {
    if(req.body.password === req.body['password-confirm']){
        next();
        return;
    }
    req.flash('error', 'Passwords do not match');
    res.redirect('back');
}
// /admin
exports.isAdmin = (req, res, next) => {
    admin = req.admin;
    if(admin === true){
        next();
        return;
    }
    req.flash('error', 'Unauthorised Access!');
    res.redirect('/');
}
// /admin-login
exports.adminLogin = (req, res, next) => {
    if(req.admin === true){
        res.redirect('/admin');
    }
    if(req.body.username === process.env.adminName && req.body.password === process.env.adminPassword){
        admin = true;
        next();
        return;
    }
}

exports.adminLogout = (req, res) => {
    admin = false;
    res.redirect('/');
}
exports.a = (req, res) => {
    admin = true;
    //admin = true;
    res.send(admin);
};
exports.b = (req, res) => {
    //admin = true;
    //admin = true;
    res.send(admin);
};
