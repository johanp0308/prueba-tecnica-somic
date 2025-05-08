import express from 'express';

import articulosRoutes from './routes/articulos.routes.js';
import clienteRoutes from './routes/nitclientes.routes.js';
import facturaRoutes from './routes/factura.routes.js';
import detalleFacturaRoutes from './routes/detalle.routes.js';
import kardexRoutes from './routes/kardex.routes.js';

const app = express();

app.use(express.json());

app.use('/api/articulos', articulosRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/factura', facturaRoutes);
app.use('/api/detalles', detalleFacturaRoutes);
app.use('/api/kardex', kardexRoutes);

export default app;