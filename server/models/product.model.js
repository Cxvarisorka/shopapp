const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minLength: [2, 'Product name must be at least 2 characters'],
        maxLength: [100, 'Product name must be at most 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minLength: [10, 'Description must be at least 10 characters'],
        maxLength: [500, 'Description must be at most 500 characters']
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;