const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');

router.post('/create', ExamController.createExam);// oke
router.get('/get-all', ExamController.getAllExam);// oke
router.get('/get-one/:id', ExamController.getExamById);// oke
router.get('/get-coming', ExamController.getComingExam);// oke
// get exam full answer
router.get('/get-one-full/:id', ExamController.getExamByIdFull);// oke
router.put('/update-member', ExamController.updateMemberExam);// oke
router.put('/update/:id', ExamController.updateExam);// oke
router.delete('/delete/:id', ExamController.deleteExam);// oke
router.post('/get-question', ExamController.getQuestionByIndex);// oke
router.get('/check-count/:id', ExamController.checkCountQuestion);// oke

module.exports = router;
