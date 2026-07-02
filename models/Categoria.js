const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({

    id_categoria: {
        type: String,
        unique: true
    },

    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    }

});


// Generar ID automáticamente
categoriaSchema.pre("save", async function(next){

    if (!this.id_categoria) {

        const cantidad = await mongoose.model("Categoria").countDocuments();

        this.id_categoria = "C" + String(cantidad + 1).padStart(3, "0");

    }

    next();

});


module.exports = mongoose.model("Categoria", categoriaSchema);