const express = require('express');
const router = express.Router();
const clientesModel = require('../models/clientesModel');

router.get('/clientes', async (req, res) => {
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

router.get('/clientes/:id', async (req, res) => {
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

router.post('/clientes', async (req, res) => {
  const idData = req.body;
  const clientes = new clientesModel({
    name: idData.name,
    email: idData.email,
    telephone: idData.telephone,
    address: idData.address,
    pets: idData.pets
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

router.put('/clientes/:id', async (req, res) => {
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

router.delete('/clientes/:id', async (req, res) => {
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

module.exports = router;