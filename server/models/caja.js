const mogoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
    hora: {
        type: String,
        required: [true, 'La hora es requerida']
    }
});

cajaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mogoose.model('Caja', cajaSchema);