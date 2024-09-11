const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const helper = require("../helper/sendMail")
const userModel = require("../models/userModel")

exports.signup = async (req,res) => {
    try {
        const {Name, Email, password, otp } = req.body;
    
        // Check if user already exists
        const existingUser = await userModel.findOne({ Email });
    
        if (existingUser) {
          // If user already exists and is not verified, verify OTP
          if (!existingUser.IsVerified) {
            if (otp && otp === existingUser.Code) {
              existingUser.IsVerified = true; // Verify the user
              await existingUser.save();
              return res.status(200).json({ message: 'User verified successfully!' });
            } else {
              return res.status(400).json({ message: 'Invalid OTP or OTP not provided.' });
            }
          }
          return res.status(400).json({ message: 'User already exists and is verified.' });
        }
    
        // Generate OTP (4-digit code)
        const generatedOtp = crypto.randomInt(1000, 9999);
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user with role set to 'farmer'
        const newUser = new userModel({
          Name,
          Email,
          password: hashedPassword,
          Role: 'farmer',            // Role is set to farmer
          IsVerified: false,          // Set verification status to false initially
          Code: generatedOtp          // Store generated OTP in the database
        });
        // Send OTP to user's email (via Nodemailer)
        await helper.sendOtpEmail(Email, generatedOtp);
        // Save the new user in the database
        await newUser.save();
        // Send success response
        res.status(201).json({ message: 'User registered successfully! Please verify the OTP sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup process.' });
    }

}

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await userModel.findOne({ Email: email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if user is verified
    if (!user.IsVerified) {
      return res.status(403).json({ message: 'User is not verified' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const tokenPayload = {
      id: user._id,
      Name: user.Name,
      Email: user.Email,
      Role: user.Role
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set cookie with JWT token
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

    // Send response
    res.json({
        message: 'Signed in successfully',
        token: token,
        user: {
          Name: user.Name,
          Email: user.Email,
          Role: user.Role
        }
    });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}