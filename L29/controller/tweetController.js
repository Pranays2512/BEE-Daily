const { addTweet, updateTweet, fetchAllTweets } = require("../services/tweetService");

const createTweet = async (req, res) => {
  try {
    const tweet = await addTweet(req.body.userId, req.body.body);
    res.status(201).json(tweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTweetById = async (req, res) => {
  try {
    const message = await updateTweet(req.params.id, req.body.userId, req.body.body);
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTweets = async (req, res) => {
  try {
    const tweets = await fetchAllTweets();
    const result = tweets.map(t => ({
      name: t.user.name,
      body: t.body,
      createdAt: t.createdAt,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTweet, updateTweetById, getAllTweets };
