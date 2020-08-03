import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import config from './config';

import connect from './utils/db';

import postRouter from './resources/post/post.router';
import userRouter from './resources/user/user.router';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(postRouter);
app.use(userRouter);

const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`Server is running on: ${config.port}.`);
    });
  } catch (e) {
    console.error(e);
  }
};

export default start;
