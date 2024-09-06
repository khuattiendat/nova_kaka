const express = require('express');
const router = express.Router();

const ExamUserController = require('../controllers/ExamUserController');

router.post('/create', ExamUserController.createExamUser);
router.post('/get-rating', ExamUserController.getRatingExamUserByQuestionId);
router.post('/get-all', ExamUserController.getAllExamUser);
router.get('/get-rating-exam/:examId', ExamUserController.getRatingExam);
router.post('/check-user-exit', ExamUserController.checkExamUserExit)

module.exports = router;