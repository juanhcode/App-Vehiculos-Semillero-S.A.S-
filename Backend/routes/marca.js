const {Router} = require('express');
const router = Router();
const connection = require('../db/db');


//Un servicio que permita registrar una nueva marca
router.post('',async (req,res)=>{
    try {
        const {id,descripcion,activo} = req.body;
        await connection.query(`INSERT INTO marca(id,descripcion,activo) VALUES ('${id}','${descripcion}', '${activo}')`);
        const [rows] = await connection.query(`SELECT * FROM marca WHERE id = '${id}'`);
        console.log(rows);
        return res.status(200).json(rows);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Error en el servidor"
        });
    }
})
module.exports = router;