const mongoose = require('mongoose');
const options = require('../config');

const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
};

module.exports = connect;
