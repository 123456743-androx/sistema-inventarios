const mongoose = require("mongoose");


const ProductoSchema = new mongoose.Schema({

id_producto:{
type:String
},


nombre:{
type:String,
required:true
},


descripcion:String,


precio:{
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


// Crear ID automático

ProductoSchema.pre("save", async function(next){


if(!this.id_producto){


let cantidad = await mongoose.model("Producto").countDocuments();


this.id_producto = "P00" + (cantidad + 1);


}


next();


});



module.exports = mongoose.model(
"Producto",
ProductoSchema
);