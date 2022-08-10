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

module.exports = db;