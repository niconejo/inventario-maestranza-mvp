const express = require('express');
const router = express.Router();
const {
  addPiezaToComponente,
  getPiezasByComponente,
  updatePiezaComponente,
  deletePiezaComponente
} = require('../controllers/piezaComponente.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Protegemos todas las rutas con login
router.use(authenticate);

// CRUD de relaciones
router.post('/', authorize('admin', 'gestor'), addPiezaToComponente);
router.get('/:componenteId', getPiezasByComponente);
router.put('/:id', authorize('admin', 'gestor'), updatePiezaComponente);
router.delete('/:id', authorize('admin', 'gestor'), deletePiezaComponente);

module.exports = router;
