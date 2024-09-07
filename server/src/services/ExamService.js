const ExamModel = require('../models/ExamModel');
const {checkCountQuestion, getQuestionLimit} = require("./QuestionService");
const createExam = async (examData) => {
    try {
        const {title, date, startTime, endTime, numberOfQuestions, createdBy} = examData;
        if (!title || !date || !startTime || !endTime || !numberOfQuestions || !createdBy) {
            return {
                error: true,
                message: 'All fields are required',
                data: null
            }
        }
        const checkQuestion = await checkCountQuestion();
        if (checkQuestion.data < numberOfQuestions) {
            return {
                data: null,
                error: true,
                message: 'Số lượng câu hỏi không đủ (hiện đang có ' + checkQuestion.data + ' câu hỏi)'
            }
        }
        const questions = await getQuestionLimit(numberOfQuestions);
        console.log(questions)
        const exam = new ExamModel({
            title,
            date,
            startTime,
            endTime,
            questions: questions?.data,
            numberOfQuestions,
            createdBy,
        });
        await exam.save();
        return {
            error: false,
            message: 'Exam created successfully',
            data: exam
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllExam = async () => {
    try {
        const exams = await ExamModel.find({})
            .populate({
                path: 'questions',
                select: 'question options.option options._id' // only include 'question' and 'options.option'
            })
            .populate({
                path: 'members',
                select: '-password' // exclude 'password'
            })
            .populate({
                path: 'createdBy',
                select: '-password' // exclude 'password'
            })
            .sort({createdAt: -1})
        return {
            data: exams,
            error: false,
            message: 'Exams fetched successfully'
        }
    } catch
        (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getComingExam = async () => {
    try {
        const exams = await ExamModel.find({})
            .populate({
                path: 'questions',
                select: 'question options.option options._id' // only include 'question' and 'options.option'
            })
            .populate({
                path: 'members',
                select: '-password' // exclude 'password'
            });
        const examsData = [];
        const date = new Date().getTime();
        if (exams) {
            exams?.forEach(exam => {
                let examDate = new Date(`${exam.date} ${exam.startTime}`).getTime();
                if (examDate > date) {
                    examsData.push(exam);
                }
            })
        }
        return {
            data: examsData,
            error: false,
            message: 'Exams fetched successfully'

        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }

    }
}
const getExamById = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate({
                path: 'questions',
                select: 'question options.option options._id' // only include 'question' and 'options.option'
            })
            .populate({
                path: 'members',
                select: '-password' // exclude 'password'
            });
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam,
            error: false,
            message: 'Exam fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getExamByIdFull = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate('questions')
            .populate({
                path: 'members',
                select: '-password' // exclude 'password'
            })
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam,
            error: false,
            message: 'Exam fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const updateMemberExam = async (examId, userId) => {
    try {
        const exam = await ExamModel.findById(examId);
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        if (exam.members.includes(userId)) {
            return {
                data: null,
                error: false,
                message: 'Bạn đã tham gia kỳ thi này rồi'
            }
        }
        exam.members.unshift(userId);
        await exam.save();
        return {
            data: exam,
            error: false,
            message: 'Tham gia kỳ thi thành công'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const deleteExam = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId);
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        await ExamModel.deleteOne({_id: examId});
        return {
            data: null,
            error: false,
            message: 'Exam deleted successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const updateExam = async (examId, data) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate({
                path: 'questions',
                select: 'question options.option options._id' // only include 'question' and 'options.option'
            });
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        const {
            title,
            startTime,
            members,
            endTime,
            date,
            numberOfQuestions,
            createdBy,
        } = data;
        const checkQuestion = await checkCountQuestion();
        if (checkQuestion.data < numberOfQuestions) {
            return {
                data: null,
                error: true,
                message: 'Số lượng câu hỏi không đủ (hiện đang có ' + checkQuestion.data + ' câu hỏi)'
            }
        }
        const questions = await getQuestionLimit(numberOfQuestions);
        if (title) exam.title = title;
        if (startTime) exam.startTime = startTime;
        if (members) exam.members = members;
        if (endTime) exam.endTime = endTime;
        if (date) exam.date = date;
        if (numberOfQuestions) exam.number_of_question = numberOfQuestions;
        if (questions) exam.questions = questions?.data;
        if (createdBy) exam.createdBy = createdBy;
        await exam.save();
        return {
            data: exam,
            error: false,
            message: 'Exam updated successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const getMemberExam = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate({
                path: 'members',
                select: '-password' // exclude 'password'
            })
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam?.members,
            error: false,
            message: 'Members fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
const updateStartTime = async (examId, startTime) => {
    try {
        const exam = await ExamModel.findById(examId);
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        exam.startTime = startTime;
        await exam.save();
        return {
            data: exam,
            error: false,
            message: 'Start time updated successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
// lấy ra câu hỏi theo số thứ tự truyền vào
const getQuestionByIndex = async (examId, index) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate({
                path: 'questions',
                select: 'question options.option options._id time' // only include 'question' and 'options.option'
            })
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam?.questions[index - 1],
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
const checkCount = async (examId) => {
    try {
        const exam = await ExamModel.findById(examId)
            .populate({
                path: 'questions',
                select: 'question options.option options._id' // only include 'question' and 'options.option'
            })
        if (!exam) {
            return {
                data: null,
                error: true,
                message: 'Exam not found'
            }
        }
        return {
            data: exam?.questions.length,
            error: false,
            message: 'Question count fetched successfully'
        }
    } catch (error) {
        return {
            data: null,
            error: true,
            message: error.message || error
        }
    }
}
module.exports = {
    createExam,
    getAllExam,
    getComingExam,
    getExamById,
    getExamByIdFull,
    updateMemberExam,
    deleteExam,
    updateExam,
    getMemberExam,
    updateStartTime,
    getQuestionByIndex,
    checkCount
}