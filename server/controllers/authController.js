import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User is not registered. Please register and try again.',
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Incorrect password.',
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'hello_this_string',
      { expiresIn: '1d' }
    );

 res.cookie('token', token, {
  httpOnly: true,
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  secure: true
});

    res.status(200).json({
      preferences: user.preferences,
      message: 'Login successful.',
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      message: 'Internal Server Error.',
      error: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ authenticated: false, message: 'Unauthorized' });
    }
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    });
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({
      message: 'Internal Server Error.',
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check if user is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User is already registered. Please login.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    res.status(201).json({
      data: newUser,
      message: 'Successfully registered.',
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      message: 'Internal Server Error.',
      error: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = new User({
        name: decodedToken.name || 'No Name',
        email: decodedToken.email,
        password: 'google-auth',
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'hello_this_string',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      authenticated: true,
      id: user._id,
      email: user.email,
      name: user.name,
      preferences: user.preferences || {},
      message: 'Login successful.',
    });
  } catch (err) {
    console.error('Google Login Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
