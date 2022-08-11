const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(bodyParser.json());
app.use('/ketchup', router);

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'), (error) => {
    if (error) {
      response.status(500).send(error);
    }
  })
})

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));