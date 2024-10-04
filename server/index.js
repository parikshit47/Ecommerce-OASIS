import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/mongoose.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173' // Frontend port
}));
app.use(express.json());

// Connect to MongoDB
connectDB()
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/getProducts', async (req, res) => {
    try {
        const products = await Product.find();
        console.log("Products fetched:", products);
        if (products.length === 0) {
            console.log("No products found in the database.");
        }
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
