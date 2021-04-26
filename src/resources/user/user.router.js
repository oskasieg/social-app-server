const Router = require('express');
const auth = require('../../utils/auth');
const controllers = require('./user.controllers');
const upload = require('../../utils/files');

// /user
const userRouter = Router();

userRouter.use((req, res, next) => {
  console.log('\nNew request - user.router');
  next();
});

// register
userRouter.route('/register').post((req, res) => {
  controllers.signUp(req, res);
});

// login
userRouter.route('/').put((req, res) => {
  controllers.signIn(req, res);
});

// get profile
userRouter.route('/profile').put(auth.protect, (req, res) => {
  controllers.getProfile(req, res);
});

// get other profile
userRouter.route('/profile/:login').get((req, res) => {
  controllers.getOtherProfile(req, res);
});

// edit profile
userRouter.route('/profile/edit').put(auth.protect, upload.single('avatar'), (req, res) => {
  controllers.editProfile(req, res);
});

module.exports = userRouter;
