import User from '../models/User.js';
import { signToken } from '../lib/jwt.js';

export const signup = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'name, phone, password are required' });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(409).json({ message: 'Phone already registered' });
    }

    const user = await User.create({ name, phone, password });
    const token = signToken({ id: user._id, role: user.role });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role, isSubscribed: user.isSubscribed },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ message: 'phone, password are required' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: user._id, role: user.role });
    res.json({
      token,
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role, isSubscribed: user.isSubscribed },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

export const profile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};
