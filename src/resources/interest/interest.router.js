import { Router } from 'express';
import { getInterests } from './interest.controllers';

// /interests
const interestRouter = Router();

interestRouter.use((req, res, next) => {
  console.log('\nNew request - interest.router');
  next();
});

interestRouter.route('/').get((req, res) => {
  getInterests(req, res);
});

export default interestRouter;
