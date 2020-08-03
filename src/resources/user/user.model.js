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
  },
  avatar: {
    type: String,
    required: true,
    default: 'imgUrl',
  },
  likes: {
    type: Number,
    required: true,
  },
  numberOfPosts: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(error);
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
