const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    wishListQuantity: { type: Number, default: 0},
    wishListContainer:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    cartProducts: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 0}
    }],
    nombreCompleto: {type: String, default: ''},
    fechaDeNacimiento: {type: String},
    genero: {type: String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;