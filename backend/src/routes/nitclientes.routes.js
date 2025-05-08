import { Router } from 'express';
import * as controller from '../controllers/nitclientes.controller.js';

const router = Router();

router.get('/', controller.getClientes);
router.get('/:id', controller.getCliente);
router.post('/', controller.createCliente);
router.put('/:id', controller.updateCliente);
router.delete('/:id', controller.deleteCliente);

export default router;