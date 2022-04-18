const campoPlaca = document.querySelector('#placa');
const campoModelo = document.querySelector('#modelo');
const campoAsiento = document.querySelector('#asiento');
const campoFechaVS = document.querySelector('#fechaVS');
const campoFechaVST = document.querySelector('#fechaVST');
const campoLinea = document.querySelector('#linea');
const formulario = document.querySelector('form');

document.addEventListener('DOMContentLoaded',()=>{
    const placa = localStorage.getItem('placa');
    let url = `https://semillero-1.herokuapp.com/vehiculo/${placa}`;
    fetch(url)
        .then(response => response.json())
        .then(data => colocarData(data))
        .catch(error => console.log(error))
    
    const colocarData =(data)=>{
        data.forEach((vehiculo)=>{
            const {placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea} = vehiculo;
            campoPlaca.value=placa;
            campoModelo.value=modelo;
            campoAsiento.value=asientos;
            campoFechaVS.value=fechaVencimientoSeguro.split('T')[0];
            campoFechaVST.value=fechaVencimientoTecnomecanica.split('T')[0];
            campoLinea.value=idLinea;
        })
    }
})
formulario.addEventListener('submit', (e) => {
    const vehiculo = {
        "placa": campoPlaca.value,
        "modelo": campoModelo.value,
        "asientos": campoAsiento.value,
        "fechaVencimientoSeguro": campoFechaVS.value,
        "fechaVencimientoTecnomecanica": campoFechaVST.value,
        "idLinea": campoLinea.value,
    }
    console.log(vehiculo);
    const jsonVehiculo = JSON.stringify(vehiculo);
    console.log(jsonVehiculo);
    const asyncPostCall = async () => {
        try {
            const response = await fetch(`https://semillero-1.herokuapp.com/vehiculo/update/${campoPlaca.value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehiculo)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    asyncPostCall();
})

