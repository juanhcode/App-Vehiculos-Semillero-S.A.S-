const {pool} = require('../database/db');
const {vehiculoSchema} = require('../schemas/vehiculo');
const Joi = require('joi');
const routesVehiculo = (server)=>{
    //Get vehiculo
    server.route({
        method: 'GET',
        path: '/vehiculo',
        handler: async (request,h)=>{
            let cliente = await pool.connect();
            try{
                let result = await cliente.query(`SELECT * FROM vehiculo`);
                return result.rows;
            }catch(e){
                console.log(e);
                return h.response({
                    error:"Error"
                })
            }finally{
                cliente.release(true);
            }
        }
    }),
    //Post vehiculo
    server.route({
        method: 'POST',
        path: '/vehiculo',
        handler: async (request,h)=>{
            let cliente = await pool.connect();
            console.log(request.payload);
            try{
                const {placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea} = request.payload;               
                let response = await cliente.query(`INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea) VALUES ($1, $2, $3, $4, $5, $6) RETURNING placa`,[placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea]);
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
                payload:vehiculoSchema,
            }
        }
    }),
    //Delete Vehiculo
    server.route({
        method: 'DELETE',
        path: '/vehiculo/{placa}',
        handler: async (request,h)=>{
            let cliente = await pool.connect();
            const placa = request.params.placa;
            try{
                let response = await cliente.query(`DELETE FROM vehiculo WHERE placa = $1`,[placa]);
                if(response.rowCount>0){
                    return h.response({
                        "mensaje":"Vehiculo eliminado con exito"
                    })
                }else{
                    return h.response({
                        "error":"No se eliminó, ocurrió un evento inesperado"
                    })
                }
            }catch(err) {
                console.log({err});
                return h.response({error:'Internal errror server'});
            }finally{
                cliente.release(true);
            }
        }
    })
}
module.exports = routesVehiculo;