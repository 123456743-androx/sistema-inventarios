const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({

    id_producto:{
        type:String,
        unique:true
    },

    nombre:{
        type:String,
        required:true
    },

    descripcion:String,

    precio_venta:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        default:0
    },

    id_categoria:{
        type:String,
        required:true
    }

});


productoSchema.pre("save",async function(next){

    if(!this.id_producto){

        const cantidad =
        await mongoose.model("Producto").countDocuments();

        this.id_producto =
        "P"+String(cantidad+1).padStart(3,"0");

    }

    next();

});

module.exports = mongoose.model(
"Producto",
productoSchema
);