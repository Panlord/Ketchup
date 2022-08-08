const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/test', (req, res) => {
  res.send('it works');
});


app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));