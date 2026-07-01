const express = require("express");

const router = express.Router();


const Entrada = require("../models/Entrada");

const Producto = require("../models/Producto");



// Registrar entrada

router.post("/entrada", async(req,res)=>{


try{


const entrada = new Entrada({

producto:req.body.producto,

id_categoria:req.body.id_categoria,

cantidad:req.body.cantidad


});



await entrada.save();



// aumentar stock del producto


await Producto.findOneAndUpdate(

{

id_producto:req.body.producto

},


{

$inc:{

stock:req.body.cantidad

}

}


);



res.redirect("/entradas");



}catch(error){


console.log(error);


res.status(500).send(
"Error al registrar entrada"
);


}



});

router.get("/entradas",async(req,res)=>{

const entradas = await Entrada.find();

res.render("entradas",{

entradas

});

});



module.exports = router;