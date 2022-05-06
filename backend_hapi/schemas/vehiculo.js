const Joi = require('joi');
const vehiculoSchema = Joi.object({
    placa:Joi.string().max(255).required(),
    modelo:Joi.number().integer().required(),
    asientos:Joi.number().integer().required(),
    fechaVencimientoSeguro:Joi.date().less('now').required(),
    fechaVencimientoTecnomecanica:Joi.date().less('now').required(),
    idLinea:Joi.number().integer().required()
})

module.exports = {vehiculoSchema}