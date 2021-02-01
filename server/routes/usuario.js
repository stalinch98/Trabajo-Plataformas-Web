const express = require("express");
const Caja = require("../models/caja");
const dateTime = require('node-datetime');
const jwt = require('jsonwebtoken');

const app = express();

app.get("/caja", function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let aniodesde = req.body.aniodesde || 2021;
    aniodesde = Number(aniodesde);

    let aniohasta = req.body.aniohasta || 2021;
    aniohasta = Number(aniohasta);

    let caja = req.body.caja || '';

    Caja.find({ caja: caja, anio: aniodesde, anio: aniohasta }, 'caja fecha hora')
        .skip(desde)
        .limit(limite)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Caja.count({ caja: caja, anio: aniodesde, anio: aniohasta }, (err, conteo) => {
                // Genrar el token
                let token = jwt.sign({
                        cajas: cajas
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                    // Si todo va bien
                res.json({
                    ok: true,
                    registros: conteo,
                    token
                });
            });
        });
});

app.post("/caja", function(req, res) {
    let body = req.body;
    let dt = dateTime.create();
    let fecha = dt.format('Y-m-d');
    let anio = dt.format('Y');
    let mes = dt.format('m');
    let dia = dt.format('d');
    let hora = dt.format('H:M:S');

    let caja = new Caja({
        caja: body.caja,
        fecha: fecha,
        anio: anio,
        mes: mes,
        dia: dia,
        hora: hora
    });

    caja.save((err, cajaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        // Genrar el token
        let token = jwt.sign({
                cajas: cajaDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
            // Si todo va bien
        res.json({
            ok: true,
            token
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