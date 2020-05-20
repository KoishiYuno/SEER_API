//import modules
const express = require('express');
const submitController = require('../controllers/userController');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .post(submitController.submitArticle)
  .patch(submitController.updateArticle);

module.exports = router;
