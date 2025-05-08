import { Router } from 'express';
import * as controller from '../controllers/articulos.controller.js';

const router = Router();

router.get('/', controller.getArticulos);
router.get('/:id', controller.getArticulo);
router.post('/', controller.createArticulo);
router.put('/:id', controller.updateArticulo);
router.delete('/:id', controller.deleteArticulo);

export default router;
