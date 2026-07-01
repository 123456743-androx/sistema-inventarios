const mongoose = require("mongoose");


const entradaSchema = new mongoose.Schema({


producto:{
type:String,
required:true
},



id_categoria:{


type:String,

required:true


},



proveedor:{


type:String,

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



module.exports = mongoose.model(
"Entrada",
entradaSchema
);