const express = require('express');
const router = express.Router();
const usersModel = require('../models/usersModel');

router.get('/', async (req, res) => {
  try {
    const users = await usersModel.find({}).sort({_id: 'desc'});
    res.send(users)
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.get('/:id', async (req, res) => {
  const idUsers = req.params.id;
  try {
    const users = await usersModel.findByid(idUsers)
    res.send(users);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.post('/', async (req, res) => {
  const newUsres = req.body;
  const user = new usersModel({
    name: newUsres.name,
    username: newUsres.username,
    password: newUsres.password,
    role: newUsres.role
  });
  try {
    const currentUsers = await user.save();
    res.send(currentUsers);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.put('/:id', async (req, res) => {
  const idUsers = req.params.id;
  const users = req.body;
  try {
    const usersUpdated = await usersModel.findByIdAndUpdate(idUsers, users);
    res.send(usersUpdated);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.delete('/:id', async (req, res) => {
  const idUsers = req.params.id;
  try {
    const users = await usersModel.findByIdAndRemove(idUsers);
    res.send(users);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

module.exports = router;