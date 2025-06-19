import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Configure your email transport (use your real credentials in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // sender address from .env
    pass: process.env.GMAIL_PASS  // app password from .env
  }
});

// Store feedback count in memory (reset on server restart)
let feedbackCount = 0;

app.post('/api/feedback', async (req, res) => {
  const { email, feedback, salutation_feedback, name_feedback } = req.body;
  if (!email || !feedback) {
    return res.status(400).json({ error: 'Email and feedback are required.' });
  }
  feedbackCount++;
  let fromLine = '';
  if (salutation_feedback || name_feedback) {
    fromLine = 'From ' + (salutation_feedback ? salutation_feedback + ' ' : '') + (name_feedback || '') + '\n';
  }
  try {
    await transporter.sendMail({
      from: email,
      to: 'testblackphienixx@gmail.com',
      subject: `GH - Feedback #${feedbackCount}`,
      text: `${fromLine}${feedback}`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.get('/api/testmail', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'Test Email',
      text: 'This is a test email from your backend.'
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send test email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
