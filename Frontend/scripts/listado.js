document.addEventListener('DOMContentLoaded', () => {
    let url = 'https://semillero-1.herokuapp.com/vehiculo';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

    const mostrarData = (data) => {

        let body = ""
        data.forEach((value) => {
            const {
                placa,
                modelo,
                asientos,
                fechaVencimientoSeguro,
                fechaVencimientoTecnomecanica,
                idLinea
            } = value;
            console.log(typeof fechaVencimientoSeguro);
            body += `<tr><td>${placa}</td><td>${modelo}</td><td>${asientos}</td><td>${fechaVencimientoSeguro.split('T')[0]}</td>
        <td>${fechaVencimientoTecnomecanica.split('T')[0]}</td><td>${idLinea}</td>
        <td><button id="juan">Eliminar</button></td><td><a href="/Frontend/pages/editar.html" id="editar">Editar</a></td></tr>`
        })
        document.getElementById('data').innerHTML = body
        const botonesEliminar = document.querySelectorAll('#juan');
        const botonesEditar = document.querySelectorAll('#editar');
        eliminarRows(botonesEliminar);
        editarRows(botonesEditar);

    }
})

const eliminarRows = (boton) => {
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener('click', () => {
            console.log(boton[i].parentNode.parentNode.firstChild.textContent);
            boton[i].parentNode.parentNode.remove();
            const asyncPostCall = async () => {
                try {
                    const response = await fetch(`https://semillero-1.herokuapp.com/vehiculo/eliminar/${boton[i].parentNode.parentNode.firstChild.textContent}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log(error)
                }
            }
            asyncPostCall();
        })
    }
}

const editarRows = (boton) => {
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener('click', () => {
            const placa = boton[i].parentNode.parentNode.firstChild.textContent;
            console.log(placa)
            localStorage.setItem('placa', placa);
        })
    }
}