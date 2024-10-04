/* eslint-disable no-undef */
import cors from 'cors';
import { connectDB } from './lib/mongoose'; // Adjust the path as necessary
import Product from './models/Product'; // Adjust the path as necessary
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser'; // Ensure you import cookie-parser
import helmet from 'helmet'; // Optional for security headers

dotenv.config(); // Load environment variables from .env file

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); // For parsing cookies
app.use(helmet()); // Adds various security headers

// Connect to MongoDB
connectDB();

// Route for fetching products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Example route for form submission
app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;

  // Process the form data (this is just an example)
  console.log({ username, email, password });

  // Set a cookie with a valid expires date format
  res.cookie('username', username, {
    expires: new Date('Fri, 02 Oct 2026 22:32:51 GMT'),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use only if your site is served over HTTPS
    sameSite: 'None', // Adjust according to your requirements
  });

  // Send a response
  res.status(200).send('Form submitted successfully');
});

// Serve static files with proper caching headers
app.use('/static', express.static('public', {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'max-age=31536000, immutable');
  },
}));

// Create a payment intent route
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', // Change to your currency if needed
      // Add other options here if needed
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
