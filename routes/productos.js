const producto = new Producto({

id_producto:req.body.id_producto,

nombre:req.body.nombre,

descripcion:req.body.descripcion,

precio:req.body.precio,

stock:req.body.stock,

id_categoria:req.body.id_categoria

});
router.get("/productos",async(req,res)=>{

const productos = await Producto.find();

res.render("productos",{

productos

});

});

ProductoSchema.pre("save",async function(next){

if(!this.id_producto){

const cantidad = await mongoose.model("Producto").countDocuments();

this.id_producto =

"P"+String(cantidad+1).padStart(3,"0");

}

next();

});
await producto.save();

