import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import config from './config';

import connect from './utils/db';

import postRouter from './resources/post/post.router';
import userRouter from './resources/user/user.router';
import interestRouter from './resources/interest/interest.router';
import { checkInterests } from './resources/interest/interest.controllers';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/interests', interestRouter);

app.use(express.static(`${__dirname}/../public/images`));
app.use(express.static(`${__dirname}/../public/avatars`));

const start = async () => {
  try {
    checkInterests();
    await connect();
    app.listen(config.port, () => {
      console.log(`Server is running. Port: ${config.port}.\n`);
    });
  } catch (e) {
    console.error(e);
  }
};

export default start;
