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

app.get('/test', (req, res) => {
  res.send('it works');
});


app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));