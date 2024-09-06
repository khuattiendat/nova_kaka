const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionControlles');

router.post('/create', QuestionController.createQuestion); // oke
router.put('/update/:id', QuestionController.updateQuestion); // oke
router.delete('/delete/:id', QuestionController.deleteQuestion); // oke
router.get('/get-all', QuestionController.getAllQuestion); // oke
router.get('/get-one/:id', QuestionController.getQuestionById); // oke
router.post('/check-count', QuestionController.checkCountQuestion); // oke

module.exports = router;