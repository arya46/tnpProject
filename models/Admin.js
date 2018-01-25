const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const adminSchema = new Schema({
  question: {
    type: String,
    required : true
  },
  options: [{
    type: String,
    required : true
  }],
  optionCorrect: {
    type: String,
    required : true
  }
});

adminSchema.statics.getQuestions = function() {
  return this.aggregate(
      [{ $sample: { size: 2 } }]
  );
}

module.exports = mongoose.model('Admin', adminSchema);