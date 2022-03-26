const Tweet = require('../models/Tweet');
const ClientTwitter = require('../config/twitter');
const UserId = 1;

module.exports = {
    async getTweets(req, res) {
        const { hashtag } = req.params;
        const tweetsQueried = await Tweet.findAll({ where: { 
            hashtag: hashtag,
        }});

        const tweetsQueriedPending = getTweetsQueriedPending(tweetsQueried);
        const tweetsFromAPI = await getTweetsFromAPI(tweetsQueriedPending, tweetsQueried, hashtag);
        return res.status(200).json(tweetsFromAPI || showTweetsPending(tweetsQueriedPending));
    },
    async ApproveTweet(req, res) {
        const { id } = req.params;
        const tweet = await Tweet.findByPk(id);

        if (!tweet) return res.status(404).json('Tweet not found!');
        
        const updated = await tweet.update({
            approveUserId: UserId,
            status : true,
        })

        return res.status(200).json(updated);
    },
    async ReproveTweet(req, res) {
        const { id } = req.params;
        const tweet = await Tweet.findByPk(id);
        
        if (!tweet) return res.status(404).json('Tweet not found!');
        
        const updated = await tweet.update({
            approveUserId: UserId,
        })

        return res.status(200).json(updated);
    },
    async show(req, res) {
        const { id } = req.params;
        const tweet = await Tweet.findByPk(id);
        
        return res.status(200).json(tweet);
    },
}

const getTweetsQueriedPending = (tweetsQueried) => {
    return tweetsQueried.filter(item => item.approveUserId === '');
}


const getTweetsFromAPI = async (tweetsQueriedPending, tweetsQueried, hashtag) => {
    if (!tweetsQueriedPending.length)
        try { 
            const { data } = await ClientTwitter.get(`https://api.twitter.com/2/tweets/search/recent?query=%23${hashtag}&max_results=50&tweet.fields=conversation_id,referenced_tweets`, []);
            const dataTweets = await filterNewTweets(data, tweetsQueried);

            if (dataTweets.length) { 
                const arrTweets = await dataTweets.map(tweet => ({
                        tweetId : tweet.conversation_id,
                        hashtag: hashtag,
                        text : tweet.text,
                        status : false,
                        approveUserId : '',
                    })
                );

                return await Tweet.bulkCreate(arrTweets);
            }
        }
        catch (e) {
            //console.log(e);
        }

    return null;
}

const filterNewTweets = async (data, tweetsQueried) => {
    return data.filter(function(item) {
        if (this.count < 10 && !item.referenced_tweets && !tweetsQueried.find(tt => tt.tweetId === item.conversation_id)) {
            this.count++;
            return item;
        }
    }, {count: 0});
}

const showTweetsPending = (tweetsQueriedPending) => {
    return tweetsQueriedPending.filter(function(item) {
        if (this.count < 10) {
            this.count++;
            return item;
        }
    }, {count: 0});
}