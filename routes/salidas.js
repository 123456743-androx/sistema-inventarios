const express=require("express");

const router=express.Router();


const Salida=require("../models/Salida");
const Producto=require("../models/Producto");



router.post("/salida",async(req,res)=>{


const salida=new Salida(req.body);


await salida.save();



await Producto.findByIdAndUpdate(

req.body.producto,

{

$inc:{
stock:-req.body.cantidad
}

}

);



res.send("Salida registrada");


});


module.exports=router;