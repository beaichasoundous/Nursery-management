import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/applying', async (req, res) => {
try{
  const { full_name, email, password, phone } = req.body;
//check if email already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const user = await User.create({ full_name, email, password, phone });
  
   // Generate JWT token
    const token = User.generateJWT(user); 

    // Send response with user data and JWT
    res.status(201).json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        is_approved: user.is_approved
      },
      token, 
    });
    }catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error' });
    }
});

//--------------------------- Login route--------------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = User.generateJWT(user); // Generate the JWT

    // Send the JWT token in the response
    res.status(200).json({
      message: 'Login successful',
      token, 
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;
