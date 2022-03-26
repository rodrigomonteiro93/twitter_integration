const express = require('express');

const TweetController = require('./controllers/TweetController');
const AuthController = require('./controllers/AuthController');
const middleware = AuthController.middleware;
 
const routes = express();

routes.get('/tweets/:hashtag', middleware, TweetController.getTweets);
routes.get('/tweet/:id', middleware, TweetController.show);
routes.get('/tweets/approve/:id', middleware, TweetController.ApproveTweet);
routes.get('/tweets/reprove/:id', middleware, TweetController.ReproveTweet);

routes.post("/auth", AuthController.authentication);
routes.get('/check', middleware, AuthController.check)

module.exports = routes;