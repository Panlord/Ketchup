// Server routing
const axios = require('axios');

var router = require('express').Router();


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

module.exports = router;