const express = require("express");
const { createTweet, updateTweetById, getAllTweets } = require("../controllers/tweetController");

const router = express.Router();

router.get("/", getAllTweets);
router.post("/", createTweet);
router.put("/:id", updateTweetById);

module.exports = router;
