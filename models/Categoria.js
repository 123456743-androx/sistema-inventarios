const mongoose = require("mongoose");


const categoriaSchema = new mongoose.Schema({

id_categoria:{
    type:String,
    required:true,
    unique:true
},


nombre:{
    type:String,
    required:true
},


descripcion:{
    type:String
}


});


module.exports = mongoose.model(
"Categoria",
categoriaSchema
);