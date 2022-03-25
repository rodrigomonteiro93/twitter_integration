const Tweet = require('../models/Tweet');
const ClientTwitter = require('../config/twitter');
const UserId = 1;

module.exports = {
    async getTweets(req, res) {
        const { hashtag } = req.params;
        
        const tweetsQueried = await Tweet.findAll({ where: { 
            hashtag: hashtag,
        }});
        const tweetsQueriedPending = tweetsQueried.filter(item => item.approveUserId === '');

        if (!tweetsQueriedPending.length)
            try {
                const { data } = await ClientTwitter.get(`https://api.twitter.com/2/tweets/search/recent?query=%23${hashtag}&max_results=50&tweet.fields=conversation_id,referenced_tweets`, []);
                
                const dataTweets = data.filter(function(item) {
                    if (this.count < 10 && !item.referenced_tweets && !tweetsQueried.find(tt => tt.tweetId === item.conversation_id)) {
                        this.count++;
                        return item;
                    }
                }, {count: 0});

                if (dataTweets.length) {
                    const arrTweets = await dataTweets.map(tweet => ({
                            tweetId : tweet.conversation_id,
                            hashtag: hashtag,
                            text : tweet.text,
                            status : false,
                            approveUserId : '',
                        })
                    );

                    const created = await Tweet.bulkCreate(arrTweets);
                    return res.status(200).json(created);
                }

                return res.status(200).json([]);
            }
            catch (e) {
                //console.log(e);
            }
         
        const tweetsQueriedPendingCount = tweetsQueriedPending.filter(function(item) {
            if (this.count < 10) {
                this.count++;
                return item;
            }
        }, {count: 0});

        return res.status(200).json(tweetsQueriedPendingCount);
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