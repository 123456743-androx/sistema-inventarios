const express = require("express");
const router = express.Router();

const Categoria = require("../models/Categoria");


// Mostrar categorías
router.get("/categorias", async (req, res) => {

    try {

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

<a href="/inicio">Inicio</a>

<a href="/productos">Productos</a>

<a href="/entradas">Entradas</a>

<a href="/salidas">Salidas</a>

<a href="/categorias">Categorías</a>

</nav>

<hr>

<h2>Registrar Categoría</h2>

<form action="/categoria" method="POST">



<label>Nombre</label>

<input
type="text"
name="nombre"
placeholder="Nombre"
required>

<label>Descripción</label>

<input
type="text"
name="descripcion"
placeholder="Descripción">

<br><br>

<button type="submit">
Guardar Categoría
</button>

</form>

<hr>

<h2>Categorías Registradas</h2>

<table border="1">

<tr>

<th>ID</th>

<th>Nombre</th>

<th>Descripción</th>

</tr>
`;

        categorias.forEach(categoria => {

            html += `
<tr>

<td>${categoria.id_categoria}</td>

<td>${categoria.nombre}</td>

<td>${categoria.descripcion}</td>

</tr>
`;

        });

        html += `
</table>

</body>

</html>
`;

        res.send(html);

    } catch (error) {

        console.log(error);

        res.send("Error al mostrar categorías");

    }

});


// Guardar categoría
router.post("/categoria", async (req, res) => {

    try {

const categoria = new Categoria({

    nombre:req.body.nombre,

    descripcion:req.body.descripcion

});

        await categoria.save();

        res.redirect("/categorias");

    } catch (error) {

        console.log(error);

        res.send("Error al guardar la categoría");

    }

});


module.exports = router;

