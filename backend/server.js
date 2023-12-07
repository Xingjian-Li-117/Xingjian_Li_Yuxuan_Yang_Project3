require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./apis/user');
const tweetRoutes = require('./apis/tweet');
const cors = require('cors');

const path = require('path');

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api/users/', userRoutes);
app.use('/api/tweets/', tweetRoutes);

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});



const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/collection_name';
mongoose.connect(mongoDBEndpoint);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

// new
let frontend_dir = path.join(__dirname, '..', 'frontend', 'build')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}...`);
});