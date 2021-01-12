const express = require("express");
const Caja = require("../models/caja");

const app = express();

app.post("/caja", function(req, res) {
    let body = req.body;
    let dateTime = require('node-datetime');
    let dt = dateTime.create();
    let fecha = dt.format('Y-m-d');
    let hora = dt.format('H:M:S');

    let caja = new Caja({
        caja: body.caja,
        fecha: fecha,
        hora: hora
    });

    caja.save((err, cajaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            usuario: cajaDB
        });
    });

});

app.delete("/caja/:id", function(req, res) {
    let id = req.params.id;

    Caja.findByIdAndDelete(id, (err, cajaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!cajaDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'No encontrado en la BDD'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Ha sido eliminado'
        });

    });

});


module.exports = app;