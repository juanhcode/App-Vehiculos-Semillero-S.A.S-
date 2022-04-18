const {Router} = require('express');
const router = Router();
const connection = require('../db/db');



//Un servicio que permita registrar una nueva línea
router.post('', async (req,res)=>{
    try{
        const {id,idMarca,descripcion,activo} = req.body;
        await connection.query(`INSERT INTO linea(id,idMarca,descripcion,activo) VALUES ('${id}', '${idMarca}', '${descripcion}','${activo}')`);
        const [row] = await connection.query(`SELECT * FROM linea WHERE id = '${id}'`);
        console.log(row);
        return res.status(200).json(row);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Error en el servidor"
        })
    }
})

// Un servicio que me permita realizar una única consulta para saber cuántos registros están activos e inactivos de la tabla donde se almacenan las líneas .
router.get('/registro',async (req,res) => {
    try {
        const [row] = await connection.query('SELECT COUNT(activo) from linea WHERE activo="S" or activo="N" GROUP BY activo;');
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