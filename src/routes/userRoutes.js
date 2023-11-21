// Arquivo: routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para adicionar um novo usuário ao MongoDB
router.post('/create', userController.createUser);
router.post('/auth', userController.authenticateUser);

module.exports = router;
