"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNumberOfPosts = exports.updateFollowers = exports.updateLikes = exports.editProfile = exports.getProfile = exports.signIn = exports.signUp = void 0;

var _user = require("./user.model");

var _auth = require("../../utils/auth");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const signUp = async (req, res) => {
  if (!req.body.login || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.interests || !req.body.age) {
    return res.status(400).json({
      message: 'No valid number of keys in req.body!'
    });
  }

  try {
    const user = _objectSpread(_objectSpread({}, req.body), {}, {
      followers: 0,
      likes: 0,
      numberOfPosts: 0
    });

    await _user.User.create(user);
    res.status(200).json({
      message: 'You have created an account!'
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: 'User already exists!'
    });
  }
};

exports.signUp = signUp;

const signIn = async (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.status(400).json({
      message: 'No login or password!'
    });
  }

  const user = await _user.User.findOne({
    login: req.body.login
  });

  if (!user) {
    return res.status(400).json({
      message: 'No user in database!'
    });
  }

  try {
    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).json({
        message: 'Invalid password!'
      });
    }

    await user.updateOne({
      lastLogin: new Date()
    });
    const token = (0, _auth.newToken)(user);
    res.status(200).json({
      user,
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "User isn't exist!"
    });
  }
};

exports.signIn = signIn;

const getProfile = async (req, res) => {
  if (!req.body.login) {
    return res.status(400).json({
      message: 'No login!'
    });
  }

  try {
    const user = await _user.User.findOne({
      login: req.body.login
    });
    res.status(200).json({
      user
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "User isn't exist!"
    });
  }
};

exports.getProfile = getProfile;

const editProfile = async (req, res) => {
  if (!req.body.login || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.interests || !req.body.age || !req.body.avatar) {
    return res.status(400).json({
      message: 'No valid number of keys in req.body!'
    });
  }

  try {
    const user = await _user.User.findOne({
      login: req.body.login
    });
    await user.updateOne(req.body);
    updateLikes('increment', req.body.login);
    res.status(200).json({
      user: req.body
    });
  } catch (e) {
    res.status(500).json({
      message: "User isn't exist!"
    });
  }
}; // methods


exports.editProfile = editProfile;

const updateLikes = async (type, login) => {
  try {
    const user = await _user.User.findOne({
      login
    });

    switch (type) {
      case 'increment':
        {
          await user.updateOne({
            likes: user.likes + 1
          });
          console.log(`\n${login}: got a like!`);
          break;
        }

      case 'decrement':
        {
          await user.updateOne({
            likes: user.likes - 1
          });
          console.log(`\n${login}: lost a like!`);
          break;
        }
    }
  } catch (e) {
    console.error(e);
  }
};

exports.updateLikes = updateLikes;

const updateFollowers = async (type, login) => {
  try {
    const user = await _user.User.findOne({
      login
    });

    switch (type) {
      case 'increment':
        {
          await user.updateOne({
            followers: user.followers + 1
          });
          console.log(`\n${login}: got a follower!`);
          break;
        }

      case 'decrement':
        {
          await user.updateOne({
            followers: user.followers - 1
          });
          console.log(`\n${login}: lost a follower!`);
          break;
        }
    }
  } catch (e) {
    console.error(e);
  }
};

exports.updateFollowers = updateFollowers;

const updateNumberOfPosts = async (type, login) => {
  try {
    const user = await _user.User.findOne({
      login
    });

    switch (type) {
      case 'increment':
        {
          await user.updateOne({
            numberOfPosts: user.numberOfPosts + 1
          });
          console.log(`\n${login}: created post!`);
          break;
        }

      case 'decrement':
        {
          await user.updateOne({
            numberOfPosts: user.numberOfPosts - 1
          });
          console.log(`\n${login}: removed post!`);
          break;
        }
    }
  } catch (e) {
    console.error(e);
  }
};

exports.updateNumberOfPosts = updateNumberOfPosts;