import { Router } from 'express';
import { protect } from '../../utils/auth';
import { signUp, signIn, getProfile, editProfile } from './user.controllers';

// /user
const userRouter = Router();

userRouter.use((req, res, next) => {
  console.log('\nNew request - user.router');
  next();
});

// register
userRouter.route('/register').post((req, res) => {
  signUp(req, res);
});

// login
userRouter.route('/').put((req, res) => {
  signIn(req, res);
});

// get profile
userRouter.route('/profile').get(protect, (req, res) => {
  getProfile(req, res);
});

// edit profile
userRouter.route('/profile').put(protect, (req, res) => {
  editProfile(req, res);
});

export default userRouter;
