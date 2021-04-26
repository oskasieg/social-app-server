const Router = require('express');
const auth = require('../../utils/auth');
const controllers = require('./post.controllers');
const upload = require('../../utils/files');

// /post
const postRouter = Router();

postRouter.use((req, res, next) => {
  console.log('\nNew request - post.router');
  next();
});

// add post
postRouter.route('/').post(auth.protect, upload.array('photos', 3), (req, res) => {
  controllers.addPost(req, res);
});

// get many posts
postRouter.route('/').put((req, res) => {
  controllers.getManyPosts(req, res);
});

// get users posts
postRouter.route('/user/:login').get(auth.protect, (req, res) => {
  controllers.getUsersPosts(req, res);
});

// get post by name
postRouter.route('/:name').get((req, res) => {
  controllers.getByName(req, res);
});

// update post
postRouter.route('/:name').put(auth.protect, upload.array('photos', 3), (req, res) => {
  controllers.updatePost(req, res);
});

// remove post by name
postRouter.route('/:name').delete(auth.protect, (req, res) => {
  controllers.removePost(req, res);
});

module.exports = postRouter;
