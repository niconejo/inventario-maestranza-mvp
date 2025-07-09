const express = require('express');
const router = express.Router();
const { ensamblarComponente } = require('../controllers/ensamblaje.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Protegido con login y roles
router.post('/', authenticate, authorize('admin', 'gestor'), ensamblarComponente);

module.exports = router;
