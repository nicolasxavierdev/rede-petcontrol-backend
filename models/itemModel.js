const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

const itemModel = mongoose.model('item', schema);

module.exports = itemModel;