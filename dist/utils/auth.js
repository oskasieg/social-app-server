"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: 'No authorization token!'
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({
      message: 'No token!'
    });
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return res.status(400).json({
        message: 'No valid token!'
      });
    }

    next();
  } catch (e) {
    console.error(e);
  }
};

exports.protect = protect;