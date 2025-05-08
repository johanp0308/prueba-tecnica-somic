
import * as Articulo from '../models/articulos.model.js';

export async function getArticulos(req, res) {
  try {
    const articulos = await Articulo.obtenerArticulos();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
}

export async function getArticulo(req, res) {
  try {
    const articulo = await Articulo.obtenerArticuloPorId(req.params.id);
    if (!articulo) return res.status(404).json({ error: 'Artículo no encontrado' });
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículo' });
  }
}

export async function createArticulo(req, res) {
  try {
    const id = await Articulo.crearArticulo(req.body);
    res.status(201).json({ message: 'Artículo creado', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear artículo' });
  }
}

export async function updateArticulo(req, res) {
  try {
    await Articulo.actualizarArticulo(req.params.id, req.body);
    res.json({ message: 'Artículo actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar artículo' });
  }
}

export async function deleteArticulo(req, res) {
  try {
    await Articulo.eliminarArticulo(req.params.id);
    res.json({ message: 'Artículo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar artículo' });
  }
}