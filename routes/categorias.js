const express = require("express");

const router = express.Router();

const Categoria = require("../models/Categoria");

const path = require("path");



// Mostrar categorías

router.get("/categorias", async(req,res)=>{


const categorias = await Categoria.find();



let html = `

<!DOCTYPE html>

<html>

<head>

<title>Categorías</title>

<link rel="stylesheet" href="/style.css">

</head>


<body>


<h1>Gestión de Categorías</h1>


<nav>

<a href="/productos">Productos</a>

<a href="/entradas">Entradas</a>

<a href="/salidas">Salidas</a>

<a href="/categorias">Categorías</a>

</nav>



<h2>Crear Categoría</h2>


<form action="/categoria" method="POST">


<input

type="text"

name="id_categoria"

placeholder="ID Categoría ejemplo 01"

required>


<input

type="text"

name="nombre"

placeholder="Nombre"

required>


<input

type="text"

name="descripcion"

placeholder="Descripción">



<button>

Guardar

</button>


</form>




<h2>Categorías Registradas</h2>



<table border="1">


<tr>

<th>ID</th>

<th>Nombre</th>

<th>Descripción</th>

</tr>



`;



categorias.forEach(c=>{


html += `

<tr>

<td>${c.id_categoria}</td>

<td>${c.nombre}</td>

<td>${c.descripcion}</td>

</tr>


`;


});



html += `

</table>


</body>

</html>

`;



res.send(html);


});





// Guardar categoría


router.post("/categoria", async(req,res)=>{


const categoria = new Categoria({


id_categoria:req.body.id_categoria,

nombre:req.body.nombre,

descripcion:req.body.descripcion


});



await categoria.save();



res.redirect("/categorias");


});





module.exports = router;

