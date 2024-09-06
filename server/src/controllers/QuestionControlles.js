const {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestion,
    getQuestionById, checkCountQuestion
} = require('../services/QuestionService');
const QuestionController = {
    createQuestion: async (req, res) => {
        try {
            const data = req.body;
            const response = await createQuestion(data);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    updateQuestion: async (req, res) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const response = await updateQuestion(id, data);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    deleteQuestion: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await deleteQuestion(id);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    getAllQuestion: async (req, res) => {
        try {
            const response = await getAllQuestion();
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    getQuestionById: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await getQuestionById(id);
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    },
    checkCountQuestion: async (req, res) => {
        try {
            const response = await checkCountQuestion();
            if (response.error) {
                return res.status(400).json(response);
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                data: null,
                error: true,
                message: error.message || error
            });
        }
    }
}
module.exports = QuestionController;