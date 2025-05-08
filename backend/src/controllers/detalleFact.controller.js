import * as Detalle from '../models/detalleFact.model.js';


export async function getDetalles(req, res) {
  try {
    const detalles = await Detalle.obtenerDetallesFactura();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles de factura' });
  }
}

export async function getDetalle(req, res) {
  try {
    const { factCodigo, artCodigo } = req.params;
    const detalle = await Detalle.obtenerDetallePorId(factCodigo, artCodigo);
    if (!detalle) return res.status(404).json({ error: 'Detalle no encontrado' });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle de factura' });
  }
}

export async function createDetalle(req, res) {
  try {
    const id = await Detalle.crearDetalleFactura(req.body);
    res.status(201).json({ message: 'Detalle creado', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear detalle de factura' });
  }
}

export async function updateDetalle(req, res) {
  try {
    const { factCodigo, artCodigo } = req.params;
    await Detalle.actualizarDetalleFactura(factCodigo, artCodigo, req.body);
    res.json({ message: 'Detalle actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar detalle de factura' });
  }
}

export async function deleteDetalle(req, res) {
  try {
    const { factCodigo, artCodigo } = req.params;
    await Detalle.eliminarDetalleFactura(factCodigo, artCodigo);
    res.json({ message: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar detalle de factura' });
  }
}