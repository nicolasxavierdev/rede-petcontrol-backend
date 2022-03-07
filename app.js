const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const clientesRoute = require('./routes/clientesRoute');
const consultasRoute = require('./routes/consultasRoute');
const petsRoute = require('./routes/petsRoute');
const usersRoute = require('./routes/usersRoute');

const app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/redePetControl");

app.use('/clientes', clientesRoute);
app.use('/consultas', consultasRoute);
app.use('/pets', petsRoute);
app.use('/user', usersRoute);

app.listen(3000, () => {
  console.log('rodando na porta 3000');
});
