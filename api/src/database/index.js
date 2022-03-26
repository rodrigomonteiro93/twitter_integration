const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

//Set Models
const Tweet = require('../models/Tweet')
const User = require('../models/User')

const connection = new Sequelize(dbConfig);
Tweet.init(connection);
User.init(connection);

module.exports = connection;
