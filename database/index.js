require('dotenv/config');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on('error', () => {
  console.log('Error connecting to the database.');
});
db.once('open', () => {
  console.log('Successfully connected to the database.');
});

const scoreboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
  time: Number
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports.db = db;
module.exports.scoreboard = Scoreboard;