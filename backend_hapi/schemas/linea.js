const Joi = require('joi');
const lineaSchema = Joi.object({
    id:Joi.number().integer().required(),
    idMarca:Joi.number().integer().required(),
    descripcion:Joi.string().max(255).required(),
    activo:Joi.string().valid('S','N').required()
})

module.exports = {lineaSchema}