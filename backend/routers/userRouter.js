"use strict";
const express = require('express')
const router = express();
const upload = require('../middleware/upload');
router.use(express.json());
const userController = require('../controllers/userController');
const {authenticateToken} = require('../middleware/auth');
router.post('/signIn', userController.signIn);
router.post('/login', userController.login);
router.get('/batch', authenticateToken, userController.batch);
router.post('/destination', authenticateToken, userController.destination);
router.post('/batch/branch/destination', authenticateToken, userController.batchAndBranchAndDestination);
router.delete('/user/:id', authenticateToken, userController.deleteUserById);
router.post('/user/dataUpload', upload.single('file'), authenticateToken, userController.upload);

module.exports = router;