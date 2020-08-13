import { Router } from 'express';
import { protect } from '../../utils/auth';
import { addPost, getManyPosts, getByName, updatePost } from './post.controllers';

// /post
const postRouter = Router();

postRouter.use((req, res, next) => {
  console.log('\nNew request - post.router');
  next();
});

// add post
postRouter.route('/').post(protect, (req, res) => {
  addPost(req, res);
});

// get many posts
postRouter.route('/').put((req, res) => {
  getManyPosts(req, res);
});

// get by name
postRouter.route('/:name').get((req, res) => {
  getByName(req, res);
});

// update post
postRouter.route('/:name').put(protect, (req, res) => {
  updatePost(req, res);
});

export default postRouter;
