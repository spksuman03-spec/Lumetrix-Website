import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isMemoryDb, jsonStore } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey_antigravity_ecommerce_2026');

      if (isMemoryDb) {
        const found = jsonStore.users.find((u) => u._id === decoded.id);
        if (!found) {
          res.status(401);
          return res.json({ message: 'Not authorized, user not found' });
        }
        const { password, ...userWithoutPass } = found;
        req.user = userWithoutPass;
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        res.status(401);
        return res.json({ message: 'User token invalid' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      res.json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401);
    res.json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    res.json({ message: 'Not authorized as an admin' });
  }
};
