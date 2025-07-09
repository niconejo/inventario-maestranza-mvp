const express = require('express');
const router = express.Router();
const {
  getAllComponentes,
  createComponente,
  updateComponente,
  deleteComponente
} = require('../controllers/componente.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Protegemos todas las rutas con login
router.use(authenticate);

// Rutas para componentes
router.get('/', getAllComponentes);
router.post('/', authorize('admin', 'gestor'), createComponente);
router.put('/:id', authorize('admin', 'gestor'), updateComponente);
router.delete('/:id', authorize('admin', 'gestor'), deleteComponente);

module.exports = router;
