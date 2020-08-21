"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../../utils/auth");

var _post = require("./post.controllers");

var _files = require("../../utils/files");

// /post
const postRouter = (0, _express.Router)();
postRouter.use((req, res, next) => {
  console.log('\nNew request - post.router');
  next();
}); // add post

postRouter.route('/').post(_auth.protect, _files.upload.array('photos', 3), (req, res) => {
  (0, _post.addPost)(req, res);
}); // get many posts

postRouter.route('/').put((req, res) => {
  (0, _post.getManyPosts)(req, res);
}); // get users posts

postRouter.route('/user/:login').get(_auth.protect, (req, res) => {
  (0, _post.getUsersPosts)(req, res);
}); // get post by name

postRouter.route('/:name').get((req, res) => {
  (0, _post.getByName)(req, res);
}); // update post

postRouter.route('/:name').put(_auth.protect, _files.upload.array('photos', 3), (req, res) => {
  (0, _post.updatePost)(req, res);
}); // remove post by name

postRouter.route('/:name').delete(_auth.protect, (req, res) => {
  (0, _post.removePost)(req, res);
});
var _default = postRouter;
exports.default = _default;