const express = require('express');
const router = express.Router();
const {
  getAllPiezas,
  createPieza,
  updatePieza,
  deletePieza,
  getLowStockPiezas
} = require('../controllers/pieza.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Protegemos todas las rutas con login
router.use(authenticate);

// Rutas para piezas
router.get('/', getAllPiezas);
router.post('/', authorize('admin', 'gestor'), createPieza);
router.put('/:id', authorize('admin', 'gestor'), updatePieza);
router.delete('/:id', authorize('admin', 'gestor'), deletePieza);
router.get('/low-stock', getLowStockPiezas);

module.exports = router;