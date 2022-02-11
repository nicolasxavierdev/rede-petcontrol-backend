const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const clientesModel = mongoose.model('Clientes', schema);

module.exports = clientesModel;