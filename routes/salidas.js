const express = require("express");
const router = express.Router();

const Salida = require("../models/Salida");
const Producto = require("../models/Producto");


// Mostrar la página de salidas
router.get("/salidas", async (req, res) => {

    try {

        const salidas = await Salida.find();

        res.render("salidas", {
            salidas
        });

    } catch (error) {

        console.log(error);
        res.send("Error al cargar las salidas");

    }

});


// Registrar salida
router.post("/salida", async (req, res) => {

    try {

        const salida = new Salida(req.body);

        await salida.save();

        await Producto.findOneAndUpdate(
            { id_producto: req.body.producto },
            {
                $inc: {
                    stock: -Number(req.body.cantidad)
                }
            }
        );

        res.redirect("/salidas");

    } catch (error) {

        console.log(error);
        res.send("Error al registrar la salida");

    }

});

module.exports = router;