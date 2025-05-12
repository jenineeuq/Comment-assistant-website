import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  picture: String,
  isPremium: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

app.use(cors({
  origin: ['http://localhost:5173', 'https://comment-lp.onrender.com'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Google OAuth verification endpoint
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Get user info from Google
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { email, name, picture } = response.data;

    if (!email) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        picture,
        isPremium: false
      });
    }

    // Create JWT
    const authToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isPremium: user.isPremium
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      details: error.message 
    });
  }
});

// Add this helper function
const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
};

// Add new endpoint to verify token
app.post('/api/auth/verify', async (req, res) => {
  const { token } = req.body;
  const user = await verifyToken(token);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  res.json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      isPremium: user.isPremium
    }
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 