const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemModel = require('./models/itemModel');

const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/redePetControl');

app.listen(3000, () => {
  console.log('listening on port 3000');
});