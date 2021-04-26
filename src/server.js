const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const fs = require('fs');
const path = require('path');

const config = require('./config');

const connect = require('./utils/db');

const postRouter = require('./resources/post/post.router');
const userRouter = require('./resources/user/user.router');
const interestRouter = require('./resources/interest/interest.router');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/interests', interestRouter);

try {
  fs.mkdirSync(path.join(__dirname, '/images'));
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

app.use(express.static('./src/images'));

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT || config.port, () => {
      console.log(`Server is running on port ${process.env.PORT || config.port}.\n`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = start;
