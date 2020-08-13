"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  lastName: {
    minlength: 3,
    maxlength: 30,
    type: String,
    required: true
  },
  password: {
    minlength: 8,
    maxlength: 16,
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 10,
    max: 99,
    required: true
  },
  interests: {
    minlength: 1,
    type: Array,
    required: true
  },
  followers: {
    type: Number,
    required: true,
    default: 0
  },
  avatar: {
    type: String
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  numberOfPosts: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  lastLogin: {
    type: Date,
    default: new Date()
  }
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  _bcrypt.default.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(error);
      }

      resolve(same);
    });
  });
};

const User = _mongoose.default.model('user', userSchema);

exports.User = User;