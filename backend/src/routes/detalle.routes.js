import { Router } from 'express';
import * as controller from '../controllers/detalleFact.controller.js';


const router = Router();

router.get('/', controller.getDetalles);
router.get('/:factCodigo/:artCodigo', controller.getDetalle);
router.post('/', controller.createDetalle);
router.put('/:factCodigo/:artCodigo', controller.updateDetalle);
router.delete('/:factCodigo/:artCodigo', controller.deleteDetalle);

export default router;