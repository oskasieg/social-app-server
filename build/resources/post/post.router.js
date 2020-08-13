"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../../utils/auth");

var _post = require("./post.controllers");

// /post
const postRouter = (0, _express.Router)();
postRouter.use((req, res, next) => {
  console.log('\nNew request - post.router');
  next();
}); // add post

postRouter.route('/').post(_auth.protect, (req, res) => {
  (0, _post.addPost)(req, res);
}); // get many posts

postRouter.route('/').put((req, res) => {
  (0, _post.getManyPosts)(req, res);
}); // get by name

postRouter.route('/:name').get((req, res) => {
  (0, _post.getByName)(req, res);
}); // update post

postRouter.route('/:name').put(_auth.protect, (req, res) => {
  (0, _post.updatePost)(req, res);
});
var _default = postRouter;
exports.default = _default;