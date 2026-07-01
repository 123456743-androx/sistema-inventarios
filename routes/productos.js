const producto = new Producto({

id_producto:req.body.id_producto,

nombre:req.body.nombre,

descripcion:req.body.descripcion,

precio:req.body.precio,

stock:req.body.stock,

id_categoria:req.body.id_categoria

});


await producto.save();