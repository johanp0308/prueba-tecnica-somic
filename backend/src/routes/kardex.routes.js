import { Router } from 'express';
import * as controller from '../controllers/kardex.controller.js';

const router = Router();

router.get('/', controller.getKardex);
router.get('/:id', controller.getKardexPorId);
router.post('/', controller.createKardex);
router.put('/:id', controller.updateKardex);
router.delete('/:id', controller.deleteKardex);

export default router;