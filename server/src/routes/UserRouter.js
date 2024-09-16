const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.get('/get-all', UserController.getAllUser);
router.delete('/delete/:id', UserController.deleteUser);
router.get('/test/get-all', UserController.getAllUserTest);
module.exports = router;