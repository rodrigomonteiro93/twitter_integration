const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

//Set Models
const Tweet = require('../models/Tweet')

const connection = new Sequelize(dbConfig);
Tweet.init(connection);

module.exports = connection;
