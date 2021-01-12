const mogoose = require('mongoose');

let Schema = mogoose.Schema;

let cajaSchema = new Schema({
    caja: {
        type: String,
        required: [true, 'La caja es requerida']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    anio: {
        type: String,
        required: [true, 'El anio es requerido']
    },
    mes: {
        type: String,
        required: [true, 'El mes es requerido']
    },
    dia: {
        type: String,
        required: [true, 'El dia es requerido']
    },
    hora: {
        type: String,
        required: [true, 'La hora es requerida']
    }
});

module.exports = mogoose.model('Caja', cajaSchema);