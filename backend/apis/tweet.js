const express = require('express');
const router = express.Router();
const Tweet = require('../db/tweet/tweet.model');
const User = require('../db/user/user.model'); 
const verifyToken = require('../middleware/auth'); 

//create tweet
router.post('/', verifyToken, async (req, res) => {
    const newTweet = new Tweet(req.body);
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
        } catch (err) {
            handleError(500, err);
        }
});

//delete tweet
router.post("/:id", verifyToken, async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if(tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("Tweet has been deleted");
        } else {
            res.status(500).json({ message: "User does not have permission to delete this tweet" });
        }
        } catch (err) {
            res.status(500);
        }
});

//update tweet
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
  
        if (tweet.userId === req.body.id) {
            tweet.description = req.body.description;
            const updatedTweet = await tweet.save();
  
            res.status(200).json(updatedTweet);
        } else {
            handleError(403, "User does not have permission to edit this tweet");
        }
        } catch (err) {
            handleError(500, err);
        }
});

// get all timeline tweets
router.get('/timeline/:id', async (req, res) => {
    try {
      const allTweets = await Tweet.find().sort({ createdAt: -1 });
      res.status(200).json(allTweets);
    } catch (err) {
      handleError(500, err);
    }
});


// get user Tweets only
router.get('/user/all/:id', async (req, res) => {
    try {
      const userTweets = await Tweet.find({ userId: req.params.id }).sort({
        createdAt: -1,
      });
      res.status(200).json(userTweets);
    } catch (err) {
      handleError(500, err);
    }
});


module.exports = router;
