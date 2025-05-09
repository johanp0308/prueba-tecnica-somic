import * as Kardex from '../models/factKardex.model.js';

export async function listarMovimientos(req, res) {
  try {
    /**
     * Modificar funcion para obtener los movimientos por articulo mas no por id de Kardex
     */

    const { codigoArticulo } = req.params;
    const movimientos = await obtenerKardexPorId(codigoArticulo);
    res.json(movimientos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getKardex(req, res) {
  try {
    const movimientos = await Kardex.obtenerKardex();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el kardex' + error });
  }
}

export async function getKardexPorId(req, res) {
  try {
    const movimiento = await Kardex.obtenerKardexPorId(req.params.id);
    if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el movimiento' });
  }
}

export async function createKardex(req, res) {
  try {
    const id = await Kardex.crearKardex(req.body);
    res.status(201).json({ message: 'Movimiento creado', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el movimiento' });
  }
}

export async function updateKardex(req, res) {
  try {
    await Kardex.actualizarKardex(req.params.id, req.body);
    res.json({ message: 'Movimiento actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el movimiento' });
  }
}

export async function deleteKardex(req, res) {
  try {
    await Kardex.eliminarKardex(req.params.id);
    res.json({ message: 'Movimiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el movimiento' });
  }
}