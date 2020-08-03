"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../resources/user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user._id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
};

exports.newToken = newToken;

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });
};

exports.verifyToken = verifyToken;

const signUp = async (req, res) => {
  try {
    await _user.User.create(req.body);
    res.status(200).json({
      message: 'You have created a new account!'
    });
  } catch (e) {
    console.log(e);
    res.status(400).json('Error while creating a new account!');
  }
};

exports.signUp = signUp;