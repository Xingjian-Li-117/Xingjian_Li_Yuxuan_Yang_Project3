const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db/user/user.model');
const verifyToken  = require("../middleware/auth");

const router = express.Router();


router.get('/', (req, res) => {
    res.send('User route is working!');
});

// get user
router.get('/find/:id',async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});


//register
router.post('/register', async (req, res, next) => {
    console.log("Signup request received", req.body);

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
  
        await newUser.save();
  
        const token = jwt.sign({ id: newUser._id }, process.env.JWT);
  
        const { password, ...othersData } = newUser._doc;
        res
            .cookie("access_token", token, {
            httpOnly: true,
            })
            .status(200)
            .json(othersData);
        } catch (err) {
        next(err);
        }
});



router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

     
    
        if (!user) return res.status(404).json({ message: "User not found"});
    
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
    
        if (!isCorrect) return next(handleError(400, "Wrong password"));
    
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...othersData } = user._doc;
    
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(othersData);
        } catch (err) {
        next(err);
        }
});


//logout
router.post('/logout', async (req, res, next) => {
    try {
      res.clearCookie("access_token");
    
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      next(err);
    }
});

//update
router.put('/:id', verifyToken, async function(req, res, next) {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
        res.status(403).json({ message: "You can update only your account" });
    }
});



//isLoggedIn
router.get('/isLoggedIn', async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
  
        if (!token) {
            res.status(401).json({ message: "Not logged in" });
            return;
        }
  
        jwt.verify(token, process.env.JWT, (err, decodedToken) => {
            if (err) {
            res.status(401).json({ message: "Not logged in" });
            return;
            }
  
            res.status(200).json({ message: "Logged in" });
        });
        } catch (err) {
        next(err);
        }
});



module.exports = router;