const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require('./routes/clientesRoute');

const app = express();
app.use('/clientes', userRoute);

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/redePetControl");

app.listen(3000, () => {
  console.log('rodando na porta 3000');
});
