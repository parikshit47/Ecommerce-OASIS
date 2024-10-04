import mongoose from 'mongoose';

const { model, Schema, models } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category:{type:String, required:true},
    image: { type: String, required: true },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
