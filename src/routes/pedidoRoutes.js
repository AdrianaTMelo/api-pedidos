const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.create);
router.get('/', pedidoController.getAll);
router.get('/:id', pedidoController.getById);
router.patch('/:id/status', pedidoController.updateStatus);

module.exports = router;