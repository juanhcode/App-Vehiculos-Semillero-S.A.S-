const {pool} = require('../database/db');
const {lineaSchema} = require('../schemas/linea')
const routesLinea = (server) => {

    // Un servicio que permita registrar una nueva linea
    server.route({
        method: 'POST',
        path: '/linea',
        handler: async (request,h)=>{
            let cliente = await pool.connect();
            try{
                const {id,idMarca,descripcion,activo} = request.payload;               
                let response = await cliente.query(`INSERT INTO linea(id,idMarca,descripcion,activo) VALUES ($1, $2, $3,$4) RETURNING id`,[id,idMarca,descripcion,activo]);
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
                payload:lineaSchema,
            }
        }
    })
}

module.exports = routesLinea;