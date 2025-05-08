import pool from '../config/db.js';


export async function obtenerArticulos() {
  const [rows] = await pool.query('SELECT * FROM articulos');
  return rows;
}


export async function obtenerArticuloPorId(id) {
  const [rows] = await pool.query('SELECT * FROM articulos WHERE ARTCodigo = ?', [id]);
  return rows[0];
}


export async function crearArticulo(data) {
  const { ARTCodigo, ARTNombre, ARTLaboratorio, ARTSaldo, ARTCostos, ARTPrecio_venta } = data;
  const [result] = await pool.query(
    `INSERT INTO articulos (ARTCodigo, ARTNombre, ARTLaboratorio, ARTSaldo, ARTCostos, ARTPrecio_venta)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ARTCodigo, ARTNombre, ARTLaboratorio, ARTSaldo, ARTCostos, ARTPrecio_venta]
  );
  return result.insertId;
}

export async function actualizarArticulo(id, data) {
  const { ARTNombre, ARTLaboratorio, ARTSaldo, ARTCostos, ARTPrecio_venta } = data;
  await pool.query(
    `UPDATE articulos
     SET ARTNombre = ?, ARTLaboratorio = ?, ARTSaldo = ?, ARTCostos = ?, ARTPrecio_venta = ?
     WHERE ARTCodigo = ?`,
    [ARTNombre, ARTLaboratorio, ARTSaldo, ARTCostos, ARTPrecio_venta, id]
  );
}

export async function eliminarArticulo(id) {
  await pool.query('DELETE FROM articulos WHERE ARTCodigo = ?', [id]);
}