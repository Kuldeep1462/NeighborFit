const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Configure nodemailer transporter (using Gmail as example)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // your email from env
      pass: process.env.GMAIL_APP_PASSWORD, // app password from env
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: `[NeighborFit Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router; 