const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const petsModel = mongoose.model('Pets', schema);

module.exports = petsModel;