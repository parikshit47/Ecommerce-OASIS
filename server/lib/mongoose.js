import dotenv from 'dotenv';
dotenv.config();
// lib/mongoose.js

import mongoose from 'mongoose';
const mongoURL = process.env.MONGO_URL;

export const connectDB = async () => {
  
  try {
    await mongoose.connect(mongoURL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Propagate the error for further handling
  }
};
