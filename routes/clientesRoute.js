const express = require('express');
const router = express.Router();
const clientesModel = require('../models/clientesModel');

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  const newCliente = req.body;
  const cliente = new clientesModel({
    name: newCliente.name,
    email: newCliente.email,
    telephone: newCliente.telephone,
    address: newCliente.address,
    pets: newCliente.pets
  });
  try {
    const currentClientes = await cliente.save();
    res.send(currentClientes);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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