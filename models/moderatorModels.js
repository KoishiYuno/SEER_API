//import modules
const mongoose = require('mongoose');

const moderatorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A article must have a title'],
    unique: true,
    trim: true,
  },
  detail: {
    type: String,
    required: [
      true,
      'A article must have some detail for our moderators to check if an article is avaliable or not',
    ],
    trim: true,
  },
  status: {
    type: Boolean,
    required: [
      true,
      'An article which wait for mederating or analysing must have a status',
    ],
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const ModeratorAnalyst = mongoose.model('ModeratorAndAnalyst', moderatorSchema);

module.exports = ModeratorAnalyst;
