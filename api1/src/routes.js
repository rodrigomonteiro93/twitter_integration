const express = require('express');

const TweetController = require('./controllers/TweetController');
 
const routes = express();

routes.get('/tweets/:hashtag', TweetController.getTweets);
routes.get('/tweet/:id', TweetController.show);
routes.get('/tweets/approve/:id', TweetController.ApproveTweet);
routes.get('/tweets/reprove/:id', TweetController.ReproveTweet);

module.exports = routes;