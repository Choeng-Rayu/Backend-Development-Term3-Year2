// filepath: d:\Year2\Term3\Backend-Development\GitHup\Backend-Development-Term3-Year2\W4\W4-REST_API_Design+Modular_Express\EX-1\routes\userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users/', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;