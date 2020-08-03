import config from '../config';
import jwt from 'jsonwebtoken';
import { User } from '../resources/user/user.model';

export const newToken = (user) => {
  return jwt.sign({ id: user._id }, config.secrets.jwt, { expiresIn: config.secrets.jwtExp });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });
};

export const signUp = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).json({ message: 'You have created a new account!' });
  } catch (e) {
    console.log(e);
    res.status(400).json('Error while creating a new account!');
  }
};
