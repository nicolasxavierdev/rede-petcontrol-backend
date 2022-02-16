const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  consultationDate: {
    type: Date,
    required: true
  },
  client: {
    type: String,
    required: true
  }
});

const consultasModel = mongoose.model('Consultas', schema);

module.exports = consultasModel;