const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require('../models/usersModel');

const SECRET = 'PetC0ntr0l@2022';

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
  const idUser = req.params.id;
  try {
    const user = await usersModel.findById(idUser)
    res.send(user);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
});

router.post('/', async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
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

router.post('/login', async (req, res) => {
  try {
    const user = await usersModel.findOne({ username: req.body.username });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = await jwt.sign({ username: user.username }, SECRET);
        const {password, ...rest} = user._doc;
        res.json({ user: {...rest, token} });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;