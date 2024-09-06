const QuestionModel = require('../models/QuestionModel');
const createQuestion = async (data) => {
    try {
        const {question, options, time} = data;
        if (time && time < 5) {
            return {
                data: null,
                error: true,
                message: 'Thời gian phải lớn hơn 5 giây'
            }
        }
        if (!question || !options || options.length < 2) {
            return {
                data: null,
                error: true,
                message: 'Vui lòng cung cấp một câu hỏi và ít nhất hai lựa chọn'
            }
        }
        // check if question already exists
        const questionExists = await QuestionModel.findOne({question});
        if (questionExists) {
            return {
                data: null,
                error: true,
                message: 'Câu hỏi đã tồn tại'
            }
        }
        const newQuestion = new QuestionModel({
            question,
            options,
            time
        });
        await newQuestion.save();
        return {
            data: newQuestion,
            error: false,
            message: 'Thêm câu hỏi thành công'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getQuestionLimit = async (limit) => {
    try {
        const questions = await QuestionModel.aggregate([
            {$sample: {size: Number(limit)}}
        ]);
        return {
            data: questions,
            error: false,
            message: 'Questions fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const checkCountQuestion = async () => {
    try {
        const count = await QuestionModel.countDocuments();
        return {
            data: count,
            error: false,
            message: 'Count fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const updateQuestion = async (id, data) => {
    try {
        const {question, options, time} = data;
        if (!question || !options || options.length < 2) {
            return {
                data: null,
                error: true,
                message: 'Vui lòng cung cấp một câu hỏi và ít nhất hai lựa chọn'
            }
        }
        // check if question already exists
        const questionExists = await QuestionModel.findOne({question});
        if (questionExists && questionExists._id.toString() !== id.toString()) {
            return {
                data: null,
                error: true,
                message: 'Câu hỏi đã tồn tại'
            }
        }
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, {
            question,
            options,
            time
        }, {new: true});
        return {
            data: updatedQuestion,
            error: false,
            message: 'Cập nhật câu hỏi thành công'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const deleteQuestion = async (id) => {
    try {
        const question = await QuestionModel.findByIdAndDelete(id);
        if (!question) {
            return {
                data: null,
                error: true,
                message: 'Không tìm thấy câu hỏi'
            }
        }
        return {
            data: null,
            error: false,
            message: 'Xóa câu hỏi thành công'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getAllQuestion = async () => {
    try {
        const questions = await QuestionModel.find();
        return {
            data: questions,
            error: false,
            message: 'Questions fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getQuestionById = async (id) => {
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            return {
                data: null,
                error: true,
                message: 'Question not found'
            }
        }
        return {
            data: question,
            error: false,
            message: 'Question fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const checkAnswer = async (questionId, optionId) => {
    try {
        // Retrieve the question document from the QuestionModel
        const question = await QuestionModel.findById(questionId);
        // Iterate over the options array in the question document
        for (let i = 0; i < question.options.length; i++) {
            const option = question.options[i];

            // Check if the isAnswer field is true and if the option's text matches the user's answer
            if (option.isAnswer && option._id.toString() === optionId.toString()) {
                return true
            }
        }
        // If no correct answer was found, return that the answer is incorrect
        return false
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        };
    }
}
module.exports = {
    createQuestion,
    getQuestionLimit,
    checkCountQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestion,
    getQuestionById,
    checkAnswer
}