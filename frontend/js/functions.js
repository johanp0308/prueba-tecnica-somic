const host = 'http://127.0.0.1:3000'


//Funciones de HTML

export function activarSeccion(id) {
    const seccion = document.getElementById(id);
    if (!seccion) return;
    const inputs = seccion.querySelectorAll('input, button, select');
    inputs.forEach(input => input.disabled = false);
}

export function desactivarSeccion(id) {
    const seccion = document.getElementById(id);
    if (!seccion) return;
    const inputs = seccion.querySelectorAll('input, button, select');
    inputs.forEach(input => input.disabled = true);
  }




export function mostrarModalCrearCliente() {
    const modal = new bootstrap.Modal(document.getElementById('modal-crear-cliente'));
    modal.show();
}


// Funciones de consulta a API

export async function verificarFacturaExistente(idFactura) {
    const response = await fetch(`${host}/api/factura/${idFactura}`);
    if (!response.ok) return false;
    const factura = await response.json();
    return factura != null;
}

export async function verificarClienteExistente(nit) {
  try {
    const respuesta = await fetch(`${host}/api/clientes/${nit}`);

    if (!respuesta.ok) {
      return false;
    }

    const data = await respuesta.json();

    return data && Object.keys(data).length > 0;
  } catch (error) {
    console.error('Error al verificar cliente:', error);
    return false;


  }
}

export async function verificarAritculoExistente(idArticulo) {
  try {
    const respuesta = await fetch(`${host}/api/articulos/${idArticulo}`);

    if (!respuesta.ok) {
      return false;
    }

    const data = await respuesta.json();

    return data && Object.keys(data).length > 0;
  } catch (error) {
    console.error('Error al verificar Articulos:', error);
    return false;
  }
  
}

export async function dataCliente(nit) {
  try {
    const respuesta = await fetch(`${host}/api/clientes/${nit}`);

    if (!respuesta.ok) {
      return false;
    }
    const data = await respuesta.json();

    return data;

  } catch (error) {
    console.error('Error al verificar cliente:', error);
    return false;

  }
}

export async function dataArticulo(idArt){
  try {
    const respuesta = await fetch(`${host}/api/clientes/${idArt}`);

    if (!respuesta.ok) {
      return false;
    }
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.error('Error al verificar cliente:', error);
    return false;
    
  }


}



// Funciones de Fechas

export function obtenerFechaHoy() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];  // Devuelve en formato YYYY-MM-DD
}
