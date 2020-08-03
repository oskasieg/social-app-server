"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const baseConfig = {
  port: 8000,
  dbUrl: 'mongodb://localhost:27017/oskasieg-blog',
  secrets: {
    jwt: 'learneverything',
    jwtExp: '100d'
  }
};
var _default = baseConfig;
exports.default = _default;