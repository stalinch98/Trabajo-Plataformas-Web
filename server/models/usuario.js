const mogoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mogoose.Schema;

let cajaSchema = new Schema({
    caja: {
        type: String,
        required: [true, 'La caja es requerida']
    }
});

cajaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mogoose.model('Caja', cajaSchema);