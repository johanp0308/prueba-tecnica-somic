import pool from '../config/db.js';


export async function obtenerDetallesFactura() {
  const [rows] = await pool.query('SELECT * FROM detalle_factura');
  return rows;
}

export async function obtenerDetallePorId(factCodigo, artCodigo) {
  const [rows] = await pool.query(
    'SELECT * FROM detalle_factura WHERE FACTCodigo = ? AND ARTCodigo = ?',
    [factCodigo, artCodigo]
  );
  return rows[0];
}

export async function crearDetalleFactura(data) {
  const { DFCantidad, DFPrecio_unitario, DFSubtotal, FACTCodigo, ARTCodigo } = data;
  const [result] = await pool.query(
    `INSERT INTO detalle_factura (DFCantidad, DFPrecio_unitario, DFSubtotal, FACTCodigo, ARTCodigo)
     VALUES (?, ?, ?, ?, ?)`,
    [DFCantidad, DFPrecio_unitario, DFSubtotal, FACTCodigo, ARTCodigo]
  );
  return result.insertId;
}

export async function actualizarDetalleFactura(factCodigo, artCodigo, data) {
  const { DFCantidad, DFPrecio_unitario, DFSubtotal } = data;
  await pool.query(
    `UPDATE detalle_factura
     SET DFCantidad = ?, DFPrecio_unitario = ?, DFSubtotal = ?
     WHERE FACTCodigo = ? AND ARTCodigo = ?`,
    [DFCantidad, DFPrecio_unitario, DFSubtotal, factCodigo, artCodigo]
  );
}


export async function eliminarDetalleFactura(factCodigo, artCodigo) {
  await pool.query(
    'DELETE FROM detalle_factura WHERE FACTCodigo = ? AND ARTCodigo = ?',
    [factCodigo, artCodigo]
  );
}