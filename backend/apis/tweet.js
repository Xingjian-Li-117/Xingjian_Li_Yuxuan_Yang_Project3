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
            res.status(500);
        }
});

//delete tweet
// router.post("/:id", verifyToken, async (req, res) => {
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        // if(tweet.userId === req.body.id) {
        if(tweet.userId === req.user.id) {
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
  
        // if (tweet.userId === req.body.id) {
        if (tweet.userId === req.user.id) {
            tweet.description = req.body.description;
            const updatedTweet = await tweet.save();
  
            res.status(200).json(updatedTweet);
        } else {
            res.status(402).json({message: "User does not have permission to edit this tweet"});
        }
        } catch (err) {
            res.status(500);
        }
});

// get all timeline tweets
router.get('/timeline/all', async (req, res) => {
    try {
      const allTweets = await Tweet.find().sort({ createdAt: -1 });
      res.status(200).json(allTweets);
    } catch (err) {
      res.status(500);
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
      res.status(500);
    }
});


module.exports = router;