"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../../utils/auth");

const userRouter = (0, _express.Router)();
userRouter.use((req, res, next) => {
  console.log('New request - user.router');
  next();
});
userRouter.route('/register').post((req, res) => {
  (0, _auth.signUp)(req, res);
});
var _default = userRouter;
exports.default = _default;