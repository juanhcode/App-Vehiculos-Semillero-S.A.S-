const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.get('',(req, res) => {
    res.send('<h1>Hola gente GG</h1>')
})

//Rutas
app.use('/vehiculo/',require('./routes/vehiculo'))
app.use('/linea/',require('./routes/linea'));
app.use('/marca/',require('./routes/marca'));
app.use('/consulta/',require('./routes/consulta'))

//PUERTO
app.set('port',process.env.PORT || 4000)
app.listen(process.env.PORT,()=>{
    console.log("Corriendo en el puerto "+ app.get('port'));
})