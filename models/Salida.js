const mongoose = require("mongoose");


const SalidaSchema = new mongoose.Schema({

producto:{
type:mongoose.Schema.Types.ObjectId,
ref:"Producto"
},

cantidad:{
type:Number,
required:true
},

cliente:String,

fecha:{
type:Date,
default:Date.now
}

});


module.exports = mongoose.model(
"Salida",
SalidaSchema
);