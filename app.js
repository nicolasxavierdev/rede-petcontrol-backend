const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const clientesRoute = require('./routes/clientesRoute');
const petsRoute = require('./routes/petsRoute');


const app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/redePetControl");

app.use('/clientes', clientesRoute);
app.use('/pets', petsRoute);


app.listen(3000, () => {
  console.log('rodando na porta 3000');
});
