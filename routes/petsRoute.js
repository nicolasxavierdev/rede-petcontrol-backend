const express = require('express');
const router = express.Router();
const petsModel = require('../models/petsModel');

router.get('/', async (req, res) => {
  try {
    const pets = await petsModel.find({}).sort({_id: 'desc'});
    res.send(pets)
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.get('/:id', async (req, res) => {
  const idPets = req.params.id;
  try {
    const pets = await petsModel.findById(idPets)
    res.send(pets);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.post('/', async (req, res) => {
  const newPet = req.body;
  const pet = new petsModel({
    name: newPet.name,
    breed: newPet.breed,
    owner: newPet.owner,
    category: newPet.category
  });
  try {
    const currentPets = await pet.save();
    res.send(currentPets);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.put('/:id', async (req, res) => {
  const idPets = req.params.id;
  const pets = req.body;
  try {
    const petsUpdated = await petsModel.findByIdAndUpdate(idPets, pets);
    res.send(petsUpdated);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.delete('/:id', async (req, res) => {
  const idPets = req.params.id;
  try {
    const pets = await petsModel.findByIdAndRemove(idPets);
    res.send(pets);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

module.exports = router;