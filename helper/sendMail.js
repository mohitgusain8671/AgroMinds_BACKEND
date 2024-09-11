const nodeMailer = require("nodemailer");
require('dotenv').config();
exports.sendOtpEmail = async (email, otp) => {
    // Configure Nodemailer transporter (adjust with your email service and credentials)
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email, // Replace with your email
        pass: process.env.Password   // Replace with your email password or app-specific password
      }
    });
  
    const mailOptions = {
      from: process.env.Email,
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP for account verification is: ${otp}`
    };
  
    // Send the email
    await transporter.sendMail(mailOptions);
  };