import { Router } from 'express';
import { signUp } from '../../utils/auth';

const userRouter = Router();

userRouter.use((req, res, next) => {
  console.log('New request - user.router');
  next();
});

userRouter.route('/register').post((req, res) => {
  signUp(req, res);
});

export default userRouter;
