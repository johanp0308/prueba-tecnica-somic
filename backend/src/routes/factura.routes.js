import { Router } from 'express';
import * as controller from '../controllers/factura.controller.js';

const router = Router();

router.get('/', controller.getFacturas);
router.get('/:id', controller.getFactura);
router.post('/', controller.createFactura);
router.put('/:id', controller.updateFactura);
router.delete('/:id', controller.deleteFactura);

export default router;