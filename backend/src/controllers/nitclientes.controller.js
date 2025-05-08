import * as Cliente from '../models/nitcliente.model.js';


export async function getClientes(req, res) {
  try {
    const clientes = await Cliente.obtenerClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
}

export async function getCliente(req, res) {
  try {
    const cliente = await Cliente.obtenerClientePorId(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
}

export async function createCliente(req, res) {
  try {
    const id = await Cliente.crearCliente(req.body);
    res.status(201).json({ message: 'Cliente creado', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
}

export async function updateCliente(req, res) {
  try {
    await Cliente.actualizarCliente(req.params.id, req.body);
    res.json({ message: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
}

export async function deleteCliente(req, res) {
  try {
    await Cliente.eliminarCliente(req.params.id);
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
}