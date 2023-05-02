const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true, min: 0 },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number },
    sizes: [{ type: String, required: true, enum: ['S', 'M', 'L', 'XL', 'XXL']}],
    images: [{ type: String }],
    destination: { type: String, required: true, enum: ['hombre', 'mujer', 'niÃ±o']},
    type: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;