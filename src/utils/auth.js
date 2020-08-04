import config from '../config';
import jwt from 'jsonwebtoken';

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

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No authorization token!' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token!' });
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return res.status(400).json({ message: 'No valid token!' });
    }

    next();
  } catch (e) {
    console.error(e);
  }
};
