import { Router } from 'express';

const postRouter = Router();

postRouter.route('/post/:id').get((req, res) => {
  res.status(200).json({
    message: `pobrales post o id: ${req.params.id}`,
  });
});

export default postRouter;
