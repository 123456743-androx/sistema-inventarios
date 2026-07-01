const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require("path");

const Usuario = require('./models/Usuario');
const Producto = require('./models/Producto');

const entradas = require("./routes/entradas");
const salidas = require("./routes/salidas");
const categorias = require("./routes/categorias");

const app = express();


// CONEXION MONGODB

mongoose.connect('mongodb://127.0.0.1:27017/adn4')

.then(() => console.log('MongoDB conectado'))

.catch(err => console.log(err));



// MIDDLEWARE

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.json());

app.use(express.static('public'));



app.use(session({

secret:'inventario',

resave:false,

saveUninitialized:false

}));



// RUTAS NUEVAS

app.use("/",entradas);

app.use("/",salidas);

app.use("/",categorias);



// PAGINA PRINCIPAL LOGIN

app.get('/', (req,res)=>{

res.sendFile(
path.join(__dirname,'views/login.html')
);

});




// LOGIN

app.post('/login', async(req,res)=>{


const {email,password}=req.body;


const usuario = await Usuario.findOne({email});


if(!usuario){

return res.send("Usuario no encontrado");

}



const valido = await bcrypt.compare(
password,
usuario.password
);



if(!valido){

return res.send("Contraseña incorrecta");

}



res.redirect("/inicio");


});




// REGISTRO PAGINA

app.get('/registro',(req,res)=>{


res.sendFile(
path.join(__dirname,'views/registro.html')
);


});




// REGISTRO USUARIO

app.post('/registro',async(req,res)=>{


const {nombre,email,password}=req.body;


const hash = await bcrypt.hash(password,10);



const nuevoUsuario = new Usuario({

nombre,

email,

password:hash

});



await nuevoUsuario.save();



res.send("Usuario registrado correctamente");


});




// PAGINA INICIO

app.get("/inicio",(req,res)=>{


res.sendFile(
path.join(__dirname,"views/inicio.html")
);


});




// PRODUCTOS

app.get('/productos',async(req,res)=>{


const productos = await Producto.find();



let tabla = `

<html>

<head>

<link rel="stylesheet" href="/style.css">

</head>


<body>


<h1>Sistema de Inventario</h1>



<nav>

<a href="/productos">Productos</a>

<a href="/entradas">Entradas</a>

<a href="/salidas">Salidas</a>

<a href="/categorias">Categorias</a>


</nav>




<h2>Productos</h2>




<form action="/agregar-producto" method="POST">


<input 
type="text"
name="nombre"
placeholder="Nombre"
required>



<input

type="number"

name="precio"

step="0.01"

placeholder="Precio $"

required>




<input

type="number"

name="stock"

placeholder="Stock"

required>




<button>

Agregar

</button>



</form>





<table border="1">


<tr>

<th>Nombre</th>

<th>Precio</th>

<th>Stock</th>

<th>Acciones</th>


</tr>

`;



productos.forEach(producto=>{


tabla += `

<tr>


<td>${producto.nombre}</td>


<td>$${producto.precio}</td>


<td>${producto.stock}</td>


<td>


<a href="/editar/${producto._id}">
Editar
</a>



<a href="/eliminar/${producto._id}">
Eliminar
</a>



</td>


</tr>

`;



});



tabla += `

</table>


</body>

</html>

`;



res.send(tabla);



});






// AGREGAR PRODUCTO


app.post('/agregar-producto',async(req,res)=>{


const nuevoProducto = new Producto({


nombre:req.body.nombre,

precio:req.body.precio,

stock:req.body.stock


});



await nuevoProducto.save();



res.redirect('/productos');


});




// ELIMINAR PRODUCTO


app.get('/eliminar/:id',async(req,res)=>{


await Producto.findByIdAndDelete(
req.params.id
);


res.redirect('/productos');


});




// EDITAR PRODUCTO


app.get('/editar/:id',async(req,res)=>{


const producto =
await Producto.findById(req.params.id);



res.send(`


<html>


<body>


<h1>Editar Producto</h1>


<form action="/editar/${producto._id}" method="POST">



<input

name="nombre"

value="${producto.nombre}">



<input

name="precio"

value="${producto.precio}"

type="number"

step="0.01">



<input

name="stock"

value="${producto.stock}"

type="number">



<button>

Actualizar

</button>


</form>


</body>


</html>


`);



});





app.post('/editar/:id',async(req,res)=>{


await Producto.findByIdAndUpdate(

req.params.id,


{


nombre:req.body.nombre,

precio:req.body.precio,

stock:req.body.stock


}


);



res.redirect('/productos');


});






// PANTALLAS INVENTARIO


app.get("/entradas",(req,res)=>{


res.sendFile(
path.join(__dirname,"views/entradas.html")
);


});



app.get("/salidas",(req,res)=>{


res.sendFile(
path.join(__dirname,"views/salidas.html")
);


});



app.get("/categorias",(req,res)=>{


res.sendFile(
path.join(__dirname,"views/categorias.html")
);


});






// SERVIDOR


app.listen(3000,()=>{


console.log("Servidor en puerto 3000");


});