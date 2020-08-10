"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../../utils/auth");

var _user = require("./user.controllers");

var _files = require("../../utils/files");

// /user
const userRouter = (0, _express.Router)();
userRouter.use((req, res, next) => {
  console.log('\nNew request - user.router');
  next();
}); // register

userRouter.route('/register').post((req, res) => {
  (0, _user.signUp)(req, res);
}); // login

userRouter.route('/').put((req, res) => {
  (0, _user.signIn)(req, res);
}); // get profile

userRouter.route('/profile').put(_auth.protect, (req, res) => {
  (0, _user.getProfile)(req, res);
}); // edit profile

userRouter.route('/profile/edit').put(_auth.protect, _files.upload.single('avatar'), (req, res) => {
  (0, _user.editProfile)(req, res);
});
var _default = userRouter;
exports.default = _default;