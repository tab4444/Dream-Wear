//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");
const validator = require("validator");

//Creación del Schema Admin
const Admin = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Tu cuenta debe tener tu nombre"], 
        maxlength: 100,
        lowercase: true,
    },
    apellido: {
        type: String,
        required: [true, "Tu cuenta debe tener tu apellido"],
        maxlength: 100,
        lowercase: true,
    },
    usuario: {
        type: String,
        required: [true, "Tu cuenta debe tener un usuario"],
        maxlength: 100,
        unique: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: [true, "Tu cuenta debe contar con una contraseña"],
        minlength: 8,
        maxlength: 100,
        
    },
    carrito: {
        type: Array,
        required: [true, "Carrito"],
        minlength: 8,
        maxlength: 100,
        
    },
    favoritos: {
        type: Array,
        required: [true, "Favoritos"],
        minlength: 8,
        maxlength: 100,
        
    }

});

//Creación del modelo admin
const admin = mongoose.model("Admin", Admin);

module.exports = admin;
