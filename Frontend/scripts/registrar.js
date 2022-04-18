const placa = document.querySelector('#placa');
const modelo = document.querySelector('#modelo');
const asiento = document.querySelector('#asiento');
const campoFechaVencimiento = document.querySelector('#fechaVS');
const campoFechaVencimientoT = document.querySelector('#fechaVST');
const campoLinea = document.querySelector('#linea');
const formulario = document.querySelector('form');

formulario.addEventListener('submit', (e) => {
    const vehiculo = {
        "placa": placa.value,
        "modelo": modelo.value,
        "asientos": asiento.value,
        "fechaVencimientoSeguro": campoFechaVencimiento.value,
        "fechaVencimientoTecnomecanica": campoFechaVencimientoT.value,
        "idLinea": campoLinea.value,
    }
    console.log(vehiculo);
    const jsonVehiculo = JSON.stringify(vehiculo);
    console.log(jsonVehiculo);
    const asyncPostCall = async () => {
        try {
            const response = await fetch('https://semillero-1.herokuapp.com/vehiculo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehiculo)
            });
            const data = await response.json();
            // enter you logic when the fetch is successful
            console.log(data);
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        }
    }
    asyncPostCall();
})