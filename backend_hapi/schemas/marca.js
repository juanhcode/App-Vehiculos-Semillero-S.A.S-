const Joi = require('joi');
const marcaSchema = Joi.object({
    id:Joi.number().integer().required(),
    descripcion:Joi.string().max(255).required(),
    activo:Joi.string().valid('S','N').required()
})

module.exports = {marcaSchema}