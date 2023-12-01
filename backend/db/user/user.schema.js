const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    profileProfile: {
        type: String
    },
    description: {
        type: String
    },
    profilePicture: {
        type: String
    }
  },
  { timestamps: true });

module.exports = userSchema;

  