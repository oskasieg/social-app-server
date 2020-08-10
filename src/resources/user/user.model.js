import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 16,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 10,
    max: 99,
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
    default: 0,
  },
  avatar: {
    type: String,
    required: true,
    default: 'imgUrl',
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfPosts: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  lastLogin: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
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
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(error);
      }
      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
