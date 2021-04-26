const mongoose = require('mongoose');

//zainteresowania recznie dodane do mongoDB!

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Interest = mongoose.model('interest', interestSchema);

module.exports = Interest;
