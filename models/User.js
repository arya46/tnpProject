const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type: String,
        required: 'Please supply a name!',
        trim: true
    },
    score: Number,
    branch : String
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'id'
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);