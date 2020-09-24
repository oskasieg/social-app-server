"use strict";

const baseConfig = {
  port: 8000,
  dbUrl: 'mongodb://localhost:27017/social-app',
  secrets: {
    jwt: 'learneverything',
    jwtExp: '100d'
  }
};
module.exports = baseConfig;