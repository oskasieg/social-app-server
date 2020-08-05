"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _interest = require("./interest.controllers");

// /interests
const interestRouter = (0, _express.Router)();
interestRouter.use((req, res, next) => {
  console.log('\nNew request - interest.router');
  next();
});
interestRouter.route('/').get((req, res) => {
  (0, _interest.getInterests)(req, res);
});
var _default = interestRouter;
exports.default = _default;