import * as Factura from '../models/factura.model.js';

export async function getFacturas(req, res) {
  try {
    const facturas = await Factura.obtenerFacturas();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
}

export async function getFactura(req, res) {
  try {
    const factura = await Factura.obtenerFacturaPorId(req.params.id);
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener factura' });
  }
}

export async function createFactura(req, res) {
  try {
    const id = await Factura.crearFactura(req.body);
    res.status(201).json({ message: 'Factura creada', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear factura' + error });
  }
}

export async function updateFactura(req, res) {
  try {
    await Factura.actualizarFactura(req.params.id, req.body);
    res.json({ message: 'Factura actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar factura' });
  }
}

export async function deleteFactura(req, res) {
  try {
    await Factura.eliminarFactura(req.params.id);
    res.json({ message: 'Factura eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar factura' });
  }
}
