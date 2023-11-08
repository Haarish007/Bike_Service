const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;