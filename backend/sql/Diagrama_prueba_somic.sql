CREATE DATABASE somic_prueba;
USE somic_prueba;

DROP TABLE IF EXISTS `facturakardex`;
DROP TABLE IF EXISTS `detalle_factura`;
DROP TABLE IF EXISTS `factura`;
DROP TABLE IF EXISTS `articulos` ;
DROP TABLE IF EXISTS `nit_cliente`;

CREATE TABLE `nit_cliente` (
  `NITCodigo` integer PRIMARY KEY,
  `NITNombre` varchar(30),
  `NITCupo` decimal,
  `NITplazo` integer
);

CREATE TABLE `articulos` (
  `ARTCodigo` integer PRIMARY KEY,
  `ARTNombre` varchar(30),
  `ARTLaboratorio` varchar(40),
  `ARTSaldo` integer,
  `ARTCostos` decimal,
  `ARTPrecio_venta` decimal
);

CREATE TABLE `factura` (
  `FACTCodigo` integer PRIMARY KEY,
  `FACTFecha` date,
  `FACTNaturaleza` varchar(1),
  `FACTValorTotal` decimal,
  `NITCodigo` integer
);

CREATE TABLE `detalle_factura` (
  `DFCantidad` integer,
  `DFPrecio_unitario` decimal,
  `DFSubtotal` decimal,
  `FACTCodigo` integer,
  `ARTCodigo` integer
);

CREATE TABLE `facturakardex` (
  `FACTKCodigo` integer PRIMARY KEY,
  `FACTKFecha` date,
  `FACTKNaturaleza` varchar(1),
  `FACTKCantidad` integer,
  `FACTKSaldo_anterior` integer,
  `FACTKSaldo_actual` integer,
  `FACTReferencia` integer,
  `ARTCodigo` integer
);

ALTER TABLE `facturakardex` ADD FOREIGN KEY (`ARTCodigo`) REFERENCES `articulos` (`ARTCodigo`);

ALTER TABLE `facturakardex` ADD FOREIGN KEY (`FACTReferencia`) REFERENCES `factura` (`FACTCodigo`);

ALTER TABLE `detalle_factura` ADD FOREIGN KEY (`FACTCodigo`) REFERENCES `factura` (`FACTCodigo`);

ALTER TABLE `detalle_factura` ADD FOREIGN KEY (`ARTCodigo`) REFERENCES `articulos` (`ARTCodigo`);

ALTER TABLE `factura` ADD FOREIGN KEY (`NITCodigo`) REFERENCES `nit_cliente` (`NITCodigo`);



-- Inserciones de Prueba Generadas

INSERT INTO nit_cliente (NITCodigo, NITNombre, NITCupo, NITplazo) VALUES
(1, 'Farmacia Uno', 500000.00, 30),
(2, 'Distribuidora Luz', 750000.00, 45),
(3, 'Botica Central', 300000.00, 20),
(4, 'Droguería Vida', 450000.00, 15),
(5, 'Salud Express', 650000.00, 60);

INSERT INTO articulos (ARTCodigo, ARTNombre, ARTLaboratorio, ARTSaldo, ARTCostos, ARTPrecio_venta) VALUES
(101, 'Paracetamol', 'Bayer', 100, 200.00, 400.00),
(102, 'Ibuprofeno', 'MK', 80, 250.00, 500.00),
(103, 'Omeprazol', 'TecnoFarma', 120, 300.00, 600.00),
(104, 'Amoxicilina', 'Genfar', 90, 280.00, 560.00),
(105, 'Loratadina', 'Siegfried', 150, 180.00, 360.00);

INSERT INTO factura (FACTCodigo, FACTFecha, FACTNaturaleza, FACTValorTotal, NITCodigo) VALUES
(1001, '2025-05-01', 'V', 2000.00, 1),
(1002, '2025-05-02', 'V', 1500.00, 2),
(1003, '2025-05-03', 'V', 1800.00, 3),
(1004, '2025-05-04', 'V', 2200.00, 4),
(1005, '2025-05-05', 'V', 1600.00, 5);


INSERT INTO detalle_factura (DFCantidad, DFPrecio_unitario, DFSubtotal, FACTCodigo, ARTCodigo) VALUES
(5, 400.00, 2000.00, 1001, 101),
(3, 500.00, 1500.00, 1002, 102),
(3, 600.00, 1800.00, 1003, 103),
(4, 550.00, 2200.00, 1004, 104),
(4, 400.00, 1600.00, 1005, 105);

INSERT INTO facturakardex (FACTKCodigo, FACTKFecha, FACTKNaturaleza, FACTKCantidad, FACTKSaldo_anterior, FACTKSaldo_actual, FACTReferencia, ARTCodigo) VALUES
(5001, '2025-05-01', 'V', 5, 105, 100, 1001, 101),
(5002, '2025-05-02', 'V', 3, 83, 80, 1002, 102),
(5003, '2025-05-03', 'V', 3, 123, 120, 1003, 103),
(5004, '2025-05-04', 'V', 4, 94, 90, 1004, 104),
(5005, '2025-05-05', 'V', 4, 154, 150, 1005, 105);