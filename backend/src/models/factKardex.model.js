import pool from '../config/db.js';

// Obtener todos los movimientos del kardex
export async function obtenerKardex() {
  const [rows] = await pool.query('SELECT * FROM facturakardex');
  return rows;
}

// Obtener un movimiento por ID
export async function obtenerKardexPorId(id) {
  const [rows] = await pool.query('SELECT * FROM facturakardex WHERE FACTKCodigo = ?', [id]);
  return rows[0];
}

// Crear nuevo movimiento kardex
export async function crearKardex(data) {
  const {
    FACTKCodigo,
    FACTKFecha,
    FACTKNaturaleza,
    FACTKCantidad,
    FACTKSaldo_anterior,
    FACTKSaldo_actual,
    FACTReferencia,
    ARTCodigo
  } = data;

  const [result] = await pool.query(
    `INSERT INTO facturakardex (
      FACTKCodigo,
      FACTKFecha,
      FACTKNaturaleza,
      FACTKCantidad,
      FACTKSaldo_anterior,
      FACTKSaldo_actual,
      FACTReferencia,
      ARTCodigo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      FACTKCodigo,
      FACTKFecha,
      FACTKNaturaleza,
      FACTKCantidad,
      FACTKSaldo_anterior,
      FACTKSaldo_actual,
      FACTReferencia,
      ARTCodigo
    ]
  );

  return result.insertId;
}

// Actualizar movimiento
export async function actualizarKardex(id, data) {
  const {
    FACTKFecha, FACTKNaturaleza, FACTKCantidad, FACTKSaldo_anterior, FACTKSaldo_actual, FACTReferencia,
    ARTCodigo
  } = data;

  await pool.query(
    `UPDATE facturakardex
     SET FACTKFecha = ?, FACTKNaturaleza = ?, FACTKCantidad = ?, FACTKSaldo_anterior = ?,
         FACTKSaldo_actual = ?, FACTReferencia = ?, ARTCodigo = ?
     WHERE FACTKCodigo = ?`,
    [
      FACTKFecha, FACTKNaturaleza, FACTKCantidad, FACTKSaldo_anterior, FACTKSaldo_actual, FACTReferencia, ARTCodigo, id
    ]
  );
}

// Eliminar movimiento
export async function eliminarKardex(id) {
  await pool.query('DELETE FROM facturakardex WHERE FACTKCodigo = ?', [id]);
}
