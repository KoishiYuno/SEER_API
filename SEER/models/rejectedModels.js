//import modules
const mongoose = require('mongoose');

const rejectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A article must have a title'],
    unique: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Reject = mongoose.model('reject', rejectSchema);

module.exports = Reject;
