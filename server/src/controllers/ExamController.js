const {
    getExamByIdFull,
    getComingExam,
    deleteExam,
    updateMemberExam,
    getAllExam,
    createExam,
    getExamById,
    updateExam, getQuestionByIndex, checkCountQuestion, checkCount
} = require('../services/ExamService')
const ExamController = {
    createExam: async (req, res) => {
        try {
            const data = req.body
            const result = await createExam(data)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    getAllExam: async (req, res) => {
        try {
            const result = await getAllExam()
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    getExamById: async (req, res) => {
        try {
            const {id} = req.params
            const result = await getExamById(id)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    getExamByIdFull: async (req, res) => {
        try {
            const {id} = req.params
            const result = await getExamByIdFull(id)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    getComingExam: async (req, res) => {
        try {
            const result = await getComingExam()
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    deleteExam: async (req, res) => {
        try {
            const {id} = req.params
            const result = await deleteExam(id)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: null,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    updateMemberExam: async (req, res) => {
        try {
            const {examId, userId} = req.body
            const result = await updateMemberExam(examId, userId)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    updateExam: async (req, res) => {
        try {
            const {id} = req.params
            const data = req.body
            const result = await updateExam(id, data)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    getQuestionByIndex: async (req, res) => {
        try {
            const {id, index} = req.body
            console.log(req.body)
            const result = await getQuestionByIndex(id, index)
            if (result.error) {
                return res.status(400).json({
                    data: null,
                    error: true,
                    message: result.message
                })
            }
            return res.status(200).json({
                data: result.data,
                error: false,
                message: result.message
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message || error
            })
        }
    },
    checkCountQuestion: async (req, res) => {
        try {
            const {id} = req.params
            const response = await checkCount(id)
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
module.exports = ExamController;