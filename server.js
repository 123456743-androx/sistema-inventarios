

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const Usuario = require('./models/Usuario');
const Producto = require('./models/Producto');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/inventario')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'inventario',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.send('Usuario no encontrado');
    }

    const valido = await bcrypt.compare(password, usuario.password);

    if (!valido) {
        return res.send('Contraseña incorrecta');
    }

    res.redirect('/productos');
});
app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/views/registro.html');
});

app.get('/productos', async (req, res) => {

    const productos = await Producto.find();

    let tabla = `
    <html>

    <head>
        <link rel="stylesheet" href="/style.css">
    </head>

    <body>

    <h1>Productos</h1>

    <form action="/agregar-producto" method="POST">

        <input type="text" name="nombre" placeholder="Nombre" required>

        <input type="number" name="precio" placeholder="Precio" required>

        <input type="number" name="stock" placeholder="Stock" required>

        <button type="submit">Agregar</button>

    </form>

    <table border="1">

    <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
    </tr>
    `;

    productos.forEach(producto => {

        tabla += `
        <tr>

            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
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
app.post('/registro', async (req, res) => {

    const { nombre, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
        nombre,
        email,
        password: hash
    });

    await nuevoUsuario.save();

    res.send('Usuario registrado correctamente');
});
app.post('/agregar-producto', async (req, res) => {

    const nuevoProducto = new Producto({
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock
    });

    await nuevoProducto.save();

    res.redirect('/productos');
});
app.get('/eliminar/:id', async (req, res) => {

    await Producto.findByIdAndDelete(req.params.id);

    res.redirect('/productos');

});
app.get('/editar/:id', async (req, res) => {

    const producto = await Producto.findById(req.params.id);

    res.send(`
    <html>
    <head>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <div class="container">

    <h1>Editar Producto</h1>

    <form action="/editar/${producto._id}" method="POST">

        <input type="text" name="nombre" value="${producto.nombre}" required>

        <input type="number" name="precio" value="${producto.precio}" required>

        <input type="number" name="stock" value="${producto.stock}" required>

        <button type="submit">Actualizar</button>

    </form>

    </div>

    </body>
    </html>
    `);

});
app.post('/editar/:id', async (req, res) => {

    await Producto.findByIdAndUpdate(req.params.id, {

        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock

    });

    res.redirect('/productos');

});

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});