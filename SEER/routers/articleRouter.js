//import modules
const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();

router
  .route('/')
  .get(articleController.searchArticle)
  .get(articleController.getArticle)
  .post(articleController.submitNewArticle);

router
  .route('/admin/:id')
  .get(articleController.getArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);
//.delete(articleController.deleteModeratorArticle)
//.delete(articleController.deleteAnalysteArticle);

router
  .route('/moderator')
  .get(articleController.moderatorArticles)
  .post(articleController.createReject);

router
  .route('/moderator/:id')
  .patch(articleController.updateStatusByModerator)
  .get(articleController.getRejectedArticle)
  .delete(articleController.deleteInvalidArticle);

router
  .route('/analyst')
  .get(articleController.analysteArticles)
  .post(articleController.submitArticle);

module.exports = router;
