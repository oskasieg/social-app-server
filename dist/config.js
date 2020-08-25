"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const baseConfig = {
  port: 8000,
  dbUrl: 'mongodb+srv://oskasieg:E16af688oska@sociall-app-oskasieg.iigv8.mongodb.net/social-app?retryWrites=true&w=majority',
  secrets: {
    jwt: 'learneverything',
    jwtExp: '100d'
  }
};
var _default = baseConfig;
exports.default = _default;