import { Router } from 'express';
import { protect } from '../../utils/auth';
import { addPost, getManyPosts, getByName, updatePost, removePost, getUsersPosts } from './post.controllers';
import { upload } from '../../utils/files';

// /post
const postRouter = Router();

postRouter.use((req, res, next) => {
  console.log('\nNew request - post.router');
  next();
});

// add post
postRouter.route('/').post(protect, upload.array('photos', 3), (req, res) => {
  addPost(req, res);
});

// get many posts
postRouter.route('/').put((req, res) => {
  getManyPosts(req, res);
});

// get users posts
postRouter.route('/user/:login').get(protect, (req, res) => {
  getUsersPosts(req, res);
});

// get post by name
postRouter.route('/:name').get((req, res) => {
  getByName(req, res);
});

// update post
postRouter.route('/:name').put(protect, upload.array('photos', 3), (req, res) => {
  updatePost(req, res);
});

// remove post by name
postRouter.route('/:name').delete(protect, (req, res) => {
  removePost(req, res);
});

export default postRouter;
