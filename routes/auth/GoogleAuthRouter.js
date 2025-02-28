import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../../models/User.js';

const router = express.Router();

const GOOGLE_CLIENT_ID = '94422938394-njobeij9icm6up17h5nci6dmogj0gbq7.apps.googleusercontent.com';
const JWT_SECRET_KEY = 'secret-123';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from header

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        profilePicture: picture,
        googleAuth: true,
      });
      await user.save();
    }

    const backendToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ success: true, message: 'Google login successful', token: backendToken });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ success: false, message: 'Invalid Google token' });
  }
});

export default router;
