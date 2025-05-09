import {
    activarSeccion,
    desactivarSeccion,
    verificarFacturaExistente,
    obtenerFechaHoy
} from "./js/functions.js";

let naturaleza;
let d = document

let objectDataSend = {};



d.addEventListener('DOMContentLoaded', (e) => {


    try {
        desactivarSeccion('factura-seccion');
        desactivarSeccion('cliente-seccion')
        desactivarSeccion('articulo-seccion');

        // Seccion Factura
        const naturalezaSelect = document.getElementById('naturalezaFactura');
        if (naturalezaSelect.value) {
            activarSeccion('factura-seccion');
        }

        const fechavencimiento = document.querySelector('#fecha-vencimiento');
        fechavencimiento.disabled = true


    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }


});


document.querySelector('input').addEventListener('input', async (e) => {

    try {

        /**
         * Factura Seccion
         */

        const codigoFactura = document.querySelector('#numero-factura');
        const fechaFactura = document.querySelector('#fecha-factura');
        const mensajeError = document.querySelector('#mensaje-error');
        const mensajeFechaError = document.querySelector('#mensaje-fecha-error');

        if (codigoFactura.value) {
            e.preventDefault();
    
            if (await verificarFacturaExistente(codigoFactura.value)) {
                console.log("La factura existe");
                codigoFactura.classList.add('is-invalid');
                if (mensajeError) {
                    mensajeError.style.display = 'block';
                }
            } else {
                codigoFactura.classList.remove('is-invalid');
                if (mensajeError) {
                    mensajeError.style.display = 'none';
                }
            }
        }

        if(fechaFactura.value ){
            if (fechaFactura.value < obtenerFechaHoy()) {
                console.log("La fecha no puede ser de un día pasado");

                fechaFactura.classList.add('is-invalid');
                if (mensajeFechaError) {
                    mensajeFechaError.style.display = 'block'; 
                }
            } else {
                
                fechaFactura.classList.remove('is-invalid');
                if (mensajeFechaError) {
                    mensajeFechaError.style.display = 'none'; 
                }
            }
        }




    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }


});



document.addEventListener('click', (e) => {
    const target = e.target;

    // Verifica si el clic fue sobre un <select> y si es el de naturaleza
    if (target.tagName === 'SELECT' && target.id === 'naturalezaFactura') {
        const valor = target.value;

        // Si hay un valor válido, activa la sección factura
        if (valor === '+' || valor === '-') {
            activarSeccion('factura-seccion');
        }
    }


});