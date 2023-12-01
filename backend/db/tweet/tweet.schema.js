const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        max: 100,
    },
    },
    { timestamps: true });
  
module.exports = tweetSchema;