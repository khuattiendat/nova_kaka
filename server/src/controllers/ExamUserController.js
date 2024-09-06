const {
    createExamUser,
    getRatingExamUserByQuestionId,
    getAllExamUser,
    getRatingExam,
    checkExamUserExit
} = require('../services/ExamUserService');
const ExamUserController = {
    createExamUser: async (req, res) => {
        try {
            const data = req.body;
            const response = await createExamUser(data);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    getRatingExamUserByQuestionId: async (req, res) => {
        try {
            const {examId, questionId} = req.body;
            const response = await getRatingExamUserByQuestionId(examId, questionId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    getAllExamUser: async (req, res) => {
        try {
            const {examId} = req.body;
            const response = await getAllExamUser(examId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    getRatingExam: async (req, res) => {
        try {
            const {examId} = req.params;
            const response = await getRatingExam(examId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    },
    checkExamUserExit: async (req, res) => {
        try {
            const {userId, examId, questionId} = req.body;
            const response = await checkExamUserExit(userId, examId, questionId);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error,
                data: null
            });
        }
    }
}
module.exports = ExamUserController;