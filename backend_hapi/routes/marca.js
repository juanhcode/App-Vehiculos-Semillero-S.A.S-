const {pool} = require('../database/db');
const {marcaSchema} = require('../schemas/marca')
const Joi = require('joi');
const routesMarca = (server) => {

    // Un servicio que permita registrar una nueva marca
    server.route({
        method: 'POST',
        path: '/marca',
        handler: async (request,h)=>{
            let cliente = await pool.connect();
            try{
                const {id,descripcion,activo} = request.payload;               
                let response = await cliente.query(`INSERT INTO marca(id,descripcion,activo) VALUES ($1, $2, $3) RETURNING id`,[id,descripcion,activo]);
                console.log(request.payload);
                return response.rows;
            }catch(err) {
                console.log({err});
                return h.response({error:'Internal errror server'});
            }finally{
                cliente.release(true);
            }
        },
        options:{
            validate:{
                payload:marcaSchema,
            }
        }
    })
}

module.exports = routesMarca;