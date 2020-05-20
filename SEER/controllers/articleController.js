/* eslint-disable prettier/prettier */
//import modules
const Article = require('../models/articleModels');
const APIFeatures = require("../utils/features");
const ModeratorArticles = require('../models/moderatorModels')
const Reject = require('../models/rejectedModels');

/*
Method for Normal User
*/
//Search article by user
exports.searchArticle = async (req, res) => {
  try{
    const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const articles = await features.query;
    
    //const articles = await Article.find();

    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//submit new article from submitter, the new article will enter the moderator queue
exports.submitNewArticle = async (req, res) => {
  try{
    const newArticle = await ModeratorArticles.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      }
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
Method for Administrator
*/
//get a specific article by articled id, this feature might be only used by administrator
exports.getArticle = async(req, res) => {
 
  try{
    const articles = await Article.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    });
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

//update article by articled id, this feature might be only used by administrator
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        article: updatedArticle,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//update article by articled id, this feature might be only used by administrator
exports.deleteArticle = async (req, res) => {
  try{
    await Article.findOneAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Article delete successed'
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
Method for Moderator
*/
//get all articles that need to be checked
exports.moderatorArticles = async (req, res) => {
  try{
    const articles = await ModeratorArticles.find({status: {$ne: true}})

    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//update article status to valid (false = unmodified and true = modified and ready to analyse)
exports.updateStatusByModerator = async (req, res) => {
  try {
    const updatedArticle = await ModeratorArticles.findByIdAndUpdate(req.params.id, {status: true}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        article: updatedArticle,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//Get a specific rejected article from database, search by the name of an article
exports.getRejectedArticle = async(req, res) => {
  try{
    const articles = await Reject.find({title: req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    });
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

//create new reject article
exports.createReject = async(req, res) => {
  try{
    const newArticle = await Reject.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      }
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//delete invalid article from moderator/analyst queue, this method might be also used by analyst
exports.deleteInvalidArticle = async (req, res) => {
  try{
    await ModeratorArticles.findOneAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Article delete successed'
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
Method for Analyste
*/
//get all new articles which moderated by moderator
exports.analysteArticles = async (req, res) => {
  try{
    const articles = await ModeratorArticles.find({status: {$ne: false}})

    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//analyste submit article into the article database
exports.submitArticle = async (req, res) => {
  try{
    const newArticle = await Article.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      }
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

