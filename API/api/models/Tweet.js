const { Model, DataTypes } = require('sequelize');

class Tweet extends Model {
    static init(sequelize) {
        super.init({
            tweetId: DataTypes.STRING,
            hashtag: DataTypes.STRING,
            text: DataTypes.TEXT,
            status: DataTypes.BOOLEAN,
            approveUserId: DataTypes.INTEGER,
        }, {
            sequelize
        });
    }
}

module.exports = Tweet;