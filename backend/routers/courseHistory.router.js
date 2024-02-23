const express = require('express')
const router = express()
const upload = require('../upload');
const multer = require('multer');
const {authenticateToken} = require('../middleware/auth');
const courseHistoryController = require('../controllers/courseHistory.controller')
// const uploadController = require('../controllers/courseHistory.controller')
router.get('/course/all',authenticateToken, courseHistoryController.getAll);
router.get('/courseCode/:id',authenticateToken, courseHistoryController.findCourseCode);
// router.get('/:key', courseHistoryController.search)
router.get('/course/code',authenticateToken, courseHistoryController.code);
router.delete('/course/:id',authenticateToken, courseHistoryController.remove);
router.get('/course/duration',authenticateToken, courseHistoryController.courseDuration);
router.post('/course/duration/data',authenticateToken, courseHistoryController.courseDurationData);
router.post('/course/dataUpload', upload.single('file'),authenticateToken, courseHistoryController.upload);

module.exports = router;    