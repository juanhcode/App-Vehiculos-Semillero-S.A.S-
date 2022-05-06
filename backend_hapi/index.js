const Hapi = require('@hapi/hapi');
const routesVehiculo = require('./routes/vehiculo');
const routesMarca = require('./routes/marca');
const routesLinea = require('./routes/linea');

//Funcion Principal
const init = async () => {
    const server = Hapi.server({
        port:4000,
        host:'localhost'
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return 'Hola mundo'
      }}
    )
    routesVehiculo(server);
    routesMarca(server);
    routesLinea(server);
    await server.start();
    console.log("Servidor corriendo en el puerto 4000")
}
init();