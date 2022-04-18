const {Router} = require('express');
const router = Router();
const connection = require('../db/db');

//GET
router.get('',async (req,res) => {
    try {
        const [row] = await connection.query('SELECT * FROM vehiculo;');
        console.log(row);
        return res.status(200).json(row);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: 'Error en el servidor'
        })
    }
});

//Crear vehiculo POST
router.post('',async (req,res)=>{
    try{
        const {placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea} = req.body;
        await connection.query(`INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea) VALUES
        ('${placa}','${modelo}','${asientos}','${fechaVencimientoSeguro}','${fechaVencimientoTecnomecanica}','${idLinea}')`);
        const [result] =await connection.query(`SELECT * FROM vehiculo WHERE placa = '${placa}'`);
        console.log(result);
        return res.status(200).json(result);
    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
});

/*DATA
{
        "placa": "GJH89",
        "modelo": "2019",
        "asientos": 0,
        "fechaVencimientoSeguro": "1899-11-30T04:56:16.000Z",
        "fechaVencimientoTecnomecanica": "1899-11-30T04:56:16.000Z",
        "idLinea": 1
}
*/

//Actualizar vehículo por identificador PUT o PATCH (Se utilizo PATCH)
router.patch('/update/:placa',async (req,res)=>{
    try{
        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field =>{
            if(typeof req.body[`${field}`] === 'string'){
                return `${field} = '${req.body[`${field}`]}'`;
            }else{
                return `${field} = ${req.body[`${field}`]}`;
            }
        })
        const result = await connection.query(`UPDATE vehiculo SET ${fieldsQuery.join()} WHERE placa = '${req.params.placa}'`);
        const [rows] = await connection.query(`SELECT * FROM vehiculo WHERE placa = '${req.params.placa}';`);
        console.log(rows);
        return res.status(200).json(rows);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Error en el servidor"
        })
    }
})

//Eliminar vehículo por identificador DELETE
router.delete('/eliminar/:placa',async (req,res)=>{
    try{
        await connection.query(`DELETE FROM vehiculo WHERE placa = '${req.params.placa}';`);
        return res.status(200).json({
            message:"Se ha eliminado el Registro"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error:"Error en el servidor"
        })
    }
})

//Traer un vehiculo por id
router.get('/:placa',async (req,res) => {
    try {
        const [row] = await connection.query(`SELECT * FROM vehiculo WHERE placa = '${req.params.placa}'`);
        console.log(row);
        return res.status(200).json(row);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: 'Error en el servidor'
        })
    }
});


module.exports = router;

