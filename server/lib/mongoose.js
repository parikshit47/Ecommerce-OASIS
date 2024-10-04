import dotenv from 'dotenv';
dotenv.config();
// lib/mongoose.js

import mongoose from 'mongoose';
const mongoURL = "mongodb+srv://parikshit:gKLHDWeedDAiObXz@ecommerce.6fp9w.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Ecommerce";

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
