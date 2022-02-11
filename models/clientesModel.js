const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pets: {
    type: String,
    required: true
  }
});

const clientesModel = mongoose.model('Clientes', schema);

module.exports = clientesModel;