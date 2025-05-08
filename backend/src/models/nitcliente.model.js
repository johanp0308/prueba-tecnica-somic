import pool from '../config/db.js';


export async function obtenerClientes() {
  const [rows] = await pool.query('SELECT * FROM nit_cliente');
  return rows;
}


export async function obtenerClientePorId(id) {
  const [rows] = await pool.query('SELECT * FROM nit_cliente WHERE NITCodigo = ?', [id]);
  return rows[0];
}


export async function crearCliente(data) {
  const { NITCodigo, NITNombre, NITCupo, NITplazo } = data;
  const [result] = await pool.query(
    `INSERT INTO nit_cliente (NITCodigo, NITNombre, NITCupo, NITplazo)
     VALUES (?, ?, ?, ?)`,
    [NITCodigo, NITNombre, NITCupo, NITplazo]
  );
  return result.insertId;
}


export async function actualizarCliente(id, data) {
  const { NITNombre, NITCupo, NITplazo } = data;
  await pool.query(
    `UPDATE nit_cliente
     SET NITNombre = ?, NITCupo = ?, NITplazo = ?
     WHERE NITCodigo = ?`,
    [NITNombre, NITCupo, NITplazo, id]
  );
}

export async function eliminarCliente(id) {
  await pool.query('DELETE FROM nit_cliente WHERE NITCodigo = ?', [id]);
}