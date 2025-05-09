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


// Funciones de consulta a API

export async function verificarFacturaExistente(idFactura) {
    const response = await fetch(`${host}/api/factura/${idFactura}`);
    if (!response.ok) return false; // Si no la encuentra, está libre
    const factura = await response.json();
    return factura != null;
}



// Funciones de Fechas

export function obtenerFechaHoy() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];  // Devuelve en formato YYYY-MM-DD
}
