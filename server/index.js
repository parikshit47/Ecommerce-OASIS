import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/mongoose.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000',
    'http://localhost:3001', 
    'https://plants-oasis.vercel.app',
    'https://ecommerce-oasis-sud5.onrender.com'
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// ... existing code ...

app.use(express.json());

// Connect to MongoDB
connectDB()
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Default route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// Route to fetch products
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
