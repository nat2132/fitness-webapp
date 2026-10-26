import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import type { HydratedDocument } from 'mongoose';
import type { IUser } from '../models/User';

// Never include the hashed password in API responses
const sanitizeUser = (user: HydratedDocument<IUser>) => {
  const { password: _password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_here',
      { expiresIn: '7d' }
    );

    res.status(201).json({ user: sanitizeUser(user), token });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_here',
      { expiresIn: '7d' }
    );

    res.json({ user: sanitizeUser(user), token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}; 