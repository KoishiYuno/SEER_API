//import modules
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A article must have a title'],
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'A article must have at least one contributor'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'A article must have a published year'],
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  publisher_city: {
    type: String,
    trim: true,
  },
  publisher_country: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  doi: {
    type: String,
    trim: true,
  },
  edition: {
    type: Number,
    trim: true,
  },
  translator: {
    type: String,
    trim: true,
  },
  page: {
    type: String,
    trim: true,
  },
  chapter: {
    type: String,
    trim: true,
  },
  volume: {
    type: Number,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
    default: 4.0,
  },
  rating_count: {
    type: Number,
    trim: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
