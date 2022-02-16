const express = require('express');
const router = express.Router();
const consultasModel = require('../models/consultasModel');

router.get('/', async (req, res) => {
  try {
    const consultas = await consultasModel.find({}).sort({_id: 'desc'});
    res.send(consultas)
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.get('/:id', async (req, res) => {
  const idConsultas = req.params.id;
  try {
    const consultas = await consultasModel.findById(idConsultas)
    res.send(consultas);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.post('/', async (req, res) => {
  const newConsulta = req.body;
  const consulta = new consultasModel({
    name: newConsulta.name,
    consultationDate: newConsulta.consultationDate,
    client: newConsulta.client
  });
  try {
    const currentConsultas = await consulta.save();
    res.send(currentConsultas);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.put('/:id', async (req, res) => {
  const idConsultas = req.params.id;
  const consultas = req.body;
  try {
    const consultasUpdated = await consultasModel.findByIdAndUpdate(idConsultas, consultas);
    res.send(consultasUpdated);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.delete('/:id', async (req, res) => {
  const idConsultas = req.params.id;
  try {
    const consultas = await consultasModel.findByIdAndRemove(idConsultas);
    res.send(consultas);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

module.exports = router;