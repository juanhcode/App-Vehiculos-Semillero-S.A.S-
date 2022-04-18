const {Router} = require('express');
const router = Router();
const connection = require('../db/db');

//SERVICIOS
/*Un servicio que indique cuál es el modelo máximo almacenado y el mínimo.*/ 
router.get('/modelo',async (req,res) => {
    try {
        const [resultado] = await connection.query('SELECT MAX(modelo) as maximo FROM vehiculo;');
        console.log(resultado);
        return res.status(200).json(resultado);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: 'Error en el servidor'
        })
    }
});


//	Un servicio que me permita consultar todos los vehículos por un rango de fechas sobre el campo FECHA_VEN_SEGURO.
router.get('/rango',async (req,res) => {
    const {minimo,maximo} = req.body;
    console.log(minimo)
    try {
        const [row] = await connection.query(`SELECT * FROM vehiculo
        WHERE fechaVencimientoSeguro BETWEEN '${minimo}' AND '${maximo}';`);
        return res.status(200).json(row);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: 'Error en el servidor'
        })
    }
});

//Un servicio que me permita consultar todos los vehículos por un rango de modelos por el campo modelo.
router.get('/campo',async (req,res) => {
    const {minimo,maximo} = req.body;
    console.log(minimo)
    try {
        const [row] = await connection.query(`SELECT * FROM vehiculo
        WHERE modelo BETWEEN '${minimo}' AND '${maximo}';`);
        return res.status(200).json(row);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: 'Error en el servidor'
        })
    }
});

// Un servicio que me permita sumar todos los modelos.
router.get('/sumar',async (req,res) => {
    try {
        const [row] = await connection.query('SELECT COUNT(modelo) as suma FROM vehiculo;');
        console.log(row);
        return res.status(200).json(row);
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: 'Error en el servidor'
        })
    }
});
//Un servicio que me permita promediar todos los modelos.
router.get('/promedio',async (req,res) => {
    try {
        const [row] = await connection.query('SELECT AVG(modelo) as promedio FROM vehiculo;');
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