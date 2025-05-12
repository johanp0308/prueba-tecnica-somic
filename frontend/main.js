import {
    activarSeccion,
    desactivarSeccion,
    verificarFacturaExistente,
    obtenerFechaHoy,
    mostrarModalCrearCliente,
    verificarClienteExistente,
    dataCliente,
    verificarAritculoExistente
} from "./js/functions.js";

let naturaleza;
let d = document;


const clienteObjectDatos = {};

const articulosObjectDatos = {};

let validacionFactura = false;

let objectDataSend = {};


d.addEventListener('DOMContentLoaded', (e) => {
    try {
        desactivarSeccion('factura-seccion');
        desactivarSeccion('cliente-seccion')
        desactivarSeccion('articulo-seccion');

        
        const fechavencimiento = document.querySelector('#fecha-vencimiento');
        fechavencimiento.disabled = true;

        const fechaFactura = document.querySelector('#fecha-factura');
        fechaFactura.disabled = true;


    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }


});

/**
 * Evitar que se ingrese letras en los inputs de numero.
 * 
 */
d.querySelectorAll('.solo-numeros').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});


d.querySelector('#numero-factura').addEventListener('input', async (e) => {
    const codigoFactura = document.querySelector('#numero-factura');
    const mensajeError = d.querySelector('#mensaje-error');

    if (codigoFactura.value) {
        e.preventDefault();

        if (await verificarFacturaExistente(codigoFactura.value)) {
            console.log("La factura existe");
            codigoFactura.classList.add('is-invalid');
            if (mensajeError) {
                mensajeError.style.display = 'block';
            }
            validacionFactura = false;
        } else {
            codigoFactura.classList.remove('is-invalid');
            if (mensajeError) {
                mensajeError.style.display = 'none';
            }
            validacionFactura = true;
        }
    }
});
  

d.querySelector('#nit-cliente').addEventListener('input', async (e) =>{
    const nitcliente = d.querySelector('#nit-cliente');
    const mensajeError = d.querySelector('#mensaje-error-cliente');

    if(nitcliente.value){
        if(await (verificarClienteExistente(nitcliente.value))){

            let datosClienteGet = await dataCliente(nitcliente.value);

            objectDataSend['NITCodigo'] = dataCliente['NITCodigo'];

            let inputNombrCliente = d.querySelector('#nombre-cliente');
            inputNombrCliente.value = datosClienteGet['NITNombre'];

            Object.assign(clienteObjectDatos, datosClienteGet);

            nitcliente.classList.remove('is-invalid');
            if(mensajeError){
                mensajeError.style.display = 'none';
            }

            
        }else{

            nitcliente.classList.add('is-invalid');
            if(mensajeError){
                mensajeError.style.display = 'block';
            }
        }


    }
});


d.querySelector('#codigo-articulo').addEventListener('input',async (e) =>{
    const codigoArticulo = d.querySelector('#codigo-articulo');
    const mensareError = d.querySelector('#mensaje-error-articulo');

    if(codigoArticulo.value){
        if(await verificarAritculoExistente(codigoArticulo.value)){
            
            codigoArticulo.classList.remove('is-invalid');
                if(mensareError){
                    mensareError.style.display = 'none';
                }
    
            if(naturaleza === '+'){
                
            }else{

            }
            

        }else{
    
            codigoArticulo.classList.add('is-invalid');
                if(mensareError){
                    mensareError.style.display = 'block';
                }
    
        }
    }

});



d.addEventListener('click',(e) => {
    const target = e.target;

    if (target.tagName === 'SELECT' && target.id === 'naturalezaFactura') {
        const valor = target.value;

        if (valor === '+' || valor === '-') {
            activarSeccion('factura-seccion');
            const fechavencimiento = document.querySelector('#fecha-vencimiento');
            fechavencimiento.disabled = true;

            const fechaFactura = document.querySelector('#fecha-factura');
            fechaFactura.disabled = true;

        }
    }


    if(target.tagName === 'BUTTON' && target.id === 'btn-accept-id'){

        if(validacionFactura){
            console.log("Factura valida");
            
            let fechaFacturahoy = obtenerFechaHoy();
            
            let fechaFactura = d.querySelector('#fecha-factura');
            fechaFactura.value = fechaFacturahoy;
            
            let codigoFactura = d.querySelector("#numero-factura");
            
            objectDataSend['FACTCodigo'] = codigoFactura.value;
            objectDataSend['FACFecha'] = obtenerFechaHoy();
            
            console.log(objectDataSend);

            activarSeccion('cliente-seccion');

            let nombreCliente = d.querySelector('#nombre-cliente');
            nombreCliente.disabled = true;

        }
    }

    if(target.tagName === 'A' && target.id === 'registra-cliente-navbar'){
        e.preventDefault();

        mostrarModalCrearCliente();
    }

    if (target.tagName === 'BUTTON' && target.id === 'btn-search-cliente') {

        let cupoText = d.querySelector('#cupo-cliente');
        let plazoText = d.querySelector('#plazo');
        let nombreCliente = d.querySelector('#nombre-cliente');
        let fechaVencimiento = d.querySelector('#fecha-vencimiento');
        let fechaFacturaValue = d.querySelector('#fecha-factura').value;
    
        let dateNuevo = new Date(fechaFacturaValue);
    
        dateNuevo.setDate(dateNuevo.getDate() + clienteObjectDatos['NITplazo']);
    
        let vencimientoFormateado = dateNuevo.toISOString().split('T')[0];
    
        fechaVencimiento.value = vencimientoFormateado;

        console.log(vencimientoFormateado);
    
        nombreCliente.disabled = true;
        cupoText.textContent = clienteObjectDatos['NITCupo'];
        plazoText.textContent = clienteObjectDatos['NITplazo'];
    
        let codigoArticulo = d.querySelector('#codigo-articulo');
        codigoArticulo.disabled = false;
    }

});


let fechaFacturaValue = d.querySelector('#fecha-factura').value;

let dateNuevo = new Date(fechaFacturaValue);


console.log(dateNuevo);