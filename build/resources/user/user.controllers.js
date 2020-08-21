"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNumberOfPosts = exports.updateFollowers = exports.updateLikes = exports.editProfile = exports.getOtherProfile = exports.getProfile = exports.signIn = exports.signUp = void 0;

var _user = require("./user.model");

var _auth = require("../../utils/auth");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      numberOfPosts: 0,
      lastLogin: new Date(),
      createdAt: new Date()
    });

    const token = (0, _auth.newToken)(user);
    await _user.User.create(user);
    res.status(200).json({
      user: user,
      token: token
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Error while creating account!'
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
    return res.status(401).json({
      message: 'No user in database!'
    });
  }

  try {
    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(402).json({
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
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "User isn't exist!"
    });
  }
};

exports.getProfile = getProfile;

const getOtherProfile = async (req, res) => {
  const login = req.params.login.replace('+', ' ');

  try {
    const user = await _user.User.findOne({
      login
    });

    if (!user) {
      return res.status(400).json({
        message: "User isn't exist!"
      });
    }

    return res.status(200).json({
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      interests: user.interests,
      followers: user.followers,
      avatar: user.avatar,
      likes: user.likes,
      numberOfPosts: user.numberOfPosts,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while getting user profile!'
    });
  }
};

exports.getOtherProfile = getOtherProfile;

const editProfile = async (req, res) => {
  if (req.file && req.body.login) {
    try {
      const user = await _user.User.findOne({
        login: req.body.login
      });
      const url = `http://localhost:8000/${req.file.filename}`;
      await user.updateOne({
        avatar: url
      });
    } catch (e) {
      console.error(e);
    }
  } else if (!req.body.login || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.interests || !req.body.age) {
    return res.status(400).json({
      message: 'No valid number of keys in req.body!'
    });
  } else {
    try {
      const user = await _user.User.findOne({
        login: req.body.login
      });
      const hashPassword = await new Promise((resolve, reject) => {
        _bcrypt.default.hash(req.body.password, 8, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
      await user.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
        interests: req.body.interests,
        password: hashPassword
      }));
      res.status(200).json(_objectSpread(_objectSpread({}, req.body), {}, {
        interests: req.body.interests,
        password: hashPassword
      }));
    } catch (e) {
      res.status(500).json({
        message: 'Server error!'
      });
    }
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