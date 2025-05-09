import pool from '../config/db.js';

export async function obtenerFacturas() {
  const [rows] = await pool.query('SELECT * FROM factura');
  return rows;
}

export async function obtenerFacturaPorId(id) {
  const [rows] = await pool.query('SELECT * FROM factura WHERE FACTCodigo = ?', [id]);
  return rows[0];
}

export async function crearFactura(data) {
  const { FACTCodigo, FACTFecha, FACTNaturaleza, FACTValorTotal, NITCodigo } = data;
  const [result] = await pool.query(
    `INSERT INTO factura (FACTCodigo, FACTFecha, FACTNaturaleza, FACTValorTotal, NITCodigo)
      VALUES (?, ?, ?, ?, ?)`,
    [FACTCodigo, FACTFecha, FACTNaturaleza, FACTValorTotal, NITCodigo]
  );
  return result.insertId;
}

export async function actualizarFactura(id, data) {
  const { FACTFecha, FACTNaturaleza, FACTValorTotal, NITCodigo } = data;
  await pool.query(
    `UPDATE factura
     SET FACTFecha = ?, FACTNaturaleza = ?, FACTValorTotal = ?, NITCodigo = ?
     WHERE FACTCodigo = ?`,
    [FACTFecha, FACTNaturaleza, FACTValorTotal, NITCodigo, id]
  );
}

export async function eliminarFactura(id) {
  await pool.query('DELETE FROM factura WHERE FACTCodigo = ?', [id]);
}