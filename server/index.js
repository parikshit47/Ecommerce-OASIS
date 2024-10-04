import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import Product from './models/Product.js';
import process from 'process'; 

dotenv.config(); // Load environment variables

const app = express();
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());
const mongoURL = process.env.MONGO_URL; 

if (!mongoURL) {
    console.error('MONGO_URL is not defined in the environment variables');
    throw new Error('MONGO_URL is not defined');
}

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/getProducts', async (req, res) => {
    try {
        const products = await Product.find();
        console.log("Products fetched:", products); // Log the products fetched from the database
        if (products.length === 0) {
            console.log("No products found in the database."); // Log if no products were found
        }
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err); // Log the error if it occurs
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
