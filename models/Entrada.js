const mongoose = require("mongoose");

const entradaSchema = new mongoose.Schema({

    producto:{
        type:String,
        required:true
    },

    proveedor:{
        type:String,
        required:true
    },

    // 👇 AGREGA ESTE BLOQUE AQUÍ
    precio_costo:{
        type:Number,
        required:true
    },

    cantidad:{
        type:Number,
        required:true
    },

    fecha:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Entrada", entradaSchema);