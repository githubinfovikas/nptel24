const express = require('express')
const upload = require('../middleware/upload');
const router = express()
const certificateUploadController = require('../controllers/certificateUpload.controller');
const { authenticateToken } = require('../middleware/auth');

router.get('/certificate/allCertificate', authenticateToken, certificateUploadController.getAllCertificates);
router.get('/gmail/:id', authenticateToken, certificateUploadController.findCertificates);
router.delete('/delete/:id', authenticateToken, certificateUploadController.removeCertificate);
router.post('/batch/branch/list', authenticateToken, certificateUploadController.getAllDataBatchAndBranch);
router.put('/update/:id', authenticateToken, certificateUploadController.updateCertificate);
router.post('/certificate/count', authenticateToken, certificateUploadController.countGmailAndStatus);

router.post('/upload/certificate', upload.single('file'),authenticateToken, certificateUploadController.createCourseController);

module.exports = router