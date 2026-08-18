import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { isMemoryDb, jsonStore, saveJsonDb } from '../config/db.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (isMemoryDb) {
    const user = jsonStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      return res.json({ message: 'Invalid email or password' });
    }
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (isMemoryDb) {
    const userExists = jsonStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      res.status(400);
      return res.json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'usr_' + Date.now(),
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    jsonStore.users.push(newUser);
    saveJsonDb();

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    res.json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json({ message: 'Invalid user data' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } else {
    res.status(404);
    res.json({ message: 'User not found' });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  if (isMemoryDb) {
    const users = jsonStore.users.map(({ password, ...u }) => u);
    return res.json(users);
  }
  const users = await User.find({}).select('-password');
  res.json(users);
};
