// Server routing
const axios = require('axios');
const fs = require('fs');
const path = require('path');
var router = require('express').Router();
var scoreboardHelpers = require('./helpers/scoreboardHelpers.js');

// Get the files ready to be served, on server start
var images;
fs.readdir(path.join(__dirname, '../client/dist/assets/textCaptchaImages'), (error, files) => {
  if (error) {
    console.log('Error in loading images:', error);
  } else {
    images = files;
  }
});

// Function to send valid reCaptcha token data to Google
router.post('/validateToken', (request, response) => {
  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.captchaSecret}&response=${request.body.captchaValue}`)
    .then((results) => {
      console.log('entered', results.data);
      response.send(results.data);
    })
    .catch((error) => {
      console.log(error);
      // May need to edit this status code
      response.status(500).send(error);
    })
});

// GET request --  retrieve random text captcha file and its data
// Returns an object with img
router.get('/textCaptcha', (request, response) => {
  // Choose a random image file
  let chosenImage = images[Math.floor(Math.random() * images.length)];
  // Construct object with the captcha's data
  let imageObject = {
    url: path.join('/assets/textCaptchaImages', chosenImage),
    answer: chosenImage.split('.')[0]
  }
  response.status(200).send(imageObject);
});

// GET request -- get top 10 scores
router.get('/highscores', (request, response) => {
  // Run the query to get top 10 scores
  scoreboardHelpers.getTopTen()
    .then((results) => {
      response.status(200).send(results);
    })
    .catch((error) => {
      console.log('Error occurred when getting scoreboard helpers.', error);
      response.status(500).send();
    })
});

// POST request -- add a new score
router.post('/newScore', (request, response) => {
  // Run the query to add a new score
  scoreboardHelpers.addNewScore(request.body)
    .then(() => {
      console.log('Posted!');
      response.status(201).send();
    })
    .catch((error) => {
      console.log('Error occurred when writing to database.', error);
      response.status(500).send();
    })
});

module.exports = router;