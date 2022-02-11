const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const clientesModel = require('./models/clientesModel');

const app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/todolistDB");

app.listen(3000, () => {
  console.log('rodando na porta 3000');
});

module.exports = app;

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await clientesModel.find({}).sort({_id: 'desc'});
    res.send(clientes)
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

app.get('/clientes/:id', async (req, res) => {
  const idClientes = req.params.id;
  try {
    const clientes = await clientesModel.findById(idClientes)
    res.send(clientes);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

app.post('/clientes', async (req, res) => {
  const idData = req.body;
  const clientes = new clientesModel({
    name: idData.name,
    status: idData.status
  });
  try {
    const currentClientes = await clientes.save();
    res.send(currentClientes);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

app.put('/clientes/:id', async (req, res) => {
  const idClientes = req.params.id;
  const clientes = req.body;
  try {
    const clientesUpdated = await clientesModel.findByIdAndUpdate(idClientes, clientes);
    res.send(clientesUpdated);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  const idClientes = req.params.id;
  try {
    const clientes = await clientesModel.findByIdAndRemove(idClientes);
    res.send(clientes);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});