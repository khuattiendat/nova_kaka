const ExamUserModel = require('../models/ExamUserModel');
const {checkAnswer} = require("./QuestionService");

const createExamUser = async (data) => {
    try {
        const {examId, userId, answers} = data;
        const checkExamUser = await ExamUserModel.findOne({
            exam: examId,
            user: userId
        });
        if (checkExamUser) {
            checkExamUser.answers.push(answers);
            await checkExamUser.save();
            return {
                error: false,
                message: 'Create exam user successfully',
                data: checkExamUser
            }
        }
        const examUser = await new ExamUserModel({
            exam: examId,
            user: userId,
            answers: [answers]
        });
        await examUser.save();
        return {
            error: false,
            message: 'Create exam user successfully',
            data: examUser
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getRatingExamUserByQuestionId = async (examId, questionId) => {
    try {
        let data = [];
        const examUser = await ExamUserModel.find({
            exam: examId,
            'answers.question': questionId
        })
            .populate('answers.question')
            .populate({
                path: 'user',
                select: '-password'
            });
        if (!examUser) {
            return {
                error: true,
                message: 'Exam user not found',
                data: null
            }
        }
        for (let i = 0; i < examUser.length; i++) {
            const user = examUser[i];
            for (let j = 0; j < user.answers.length; j++) {
                const isCorrect = await checkAnswer(questionId, user.answers[j].answer);
                if (isCorrect) {
                    data.push({
                        user: user.user,
                        answers: user.answers,
                        isCorrect: user.answers.answer
                    })
                }
            }
        }
        data.sort((a, b) => a.answers.timeAnswered - b.answers.timeAnswered)
        return {
            error: false,
            message: 'Get rating exam user successfully',
            data: data
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }

}
// kiểm tra xem user đã làm câu hỏi này chưa
const checkExamUserExit = async (userId, examId, questionId) => {
    try {
        const examUser = await ExamUserModel.findOne({
            user: userId,
            exam: examId,
            'answers.question': questionId
        });
        if (!examUser) {
            return {
                error: false,
                message: 'Exam user not found',
                data: null
            }
        }
        return {
            error: false,
            message: 'Exam user found',
            data: examUser
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
const getAllExamUser = async (examId) => {
    try {
        const examUser = await ExamUserModel.find({
            exam: examId,
        })
        if (!examUser) {
            return {
                error: true,
                message: 'Exam user not found',
                data: null
            }
        }

        function calculateScoreAndTime(data) {
            let correctAnswers = 0;
            let totalTime = 0;

            data.forEach(item => {
                item.answers.forEach(answer => {
                    if (answer.answer) { // assuming an answer is correct if it's not an empty string
                        correctAnswers++;
                    }
                    totalTime += answer.timeAnswered;
                });
            });

            return {
                correctAnswers,
                totalTime
            };
        }

        calculateScoreAndTime(examUser)
        return {
            error: false,
            message: 'Get all exam user successfully',
            data: calculateScoreAndTime(examUser)
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
// lấy bảng xếp hạng tất cả các user trong exam
const getRatingExam = async (examId) => {
    try {
        const examUser = await ExamUserModel.find({
            exam: examId,
        })
            .populate({
                path: 'user',
                select: '-password'
            });
        if (!examUser) {
            return {
                error: true,
                message: 'Exam user not found',
                data: null
            }
        }
        let data = [];
        for (const item of examUser) {
            let correctAnswers = []; // true
            let inCorrectAnswers = []; //false
            let totalTime = 0;
            for (const answer of (await item).answers) {
                let check = await checkAnswer(answer.question, answer.answer);
                if (check) {
                    correctAnswers.push(answer.question);
                } else {
                    inCorrectAnswers.push(answer.question);
                }
                totalTime += answer.timeAnswered;
            }
            data.push({
                user: (await item).user,
                correctAnswers,
                inCorrectAnswers,
                totalTime
            })
        }
        // xắp xếp theo số câu đúng giảm dần, thời gian làm bài tăng dần
        data.sort((a, b) => {
            if (a.correctAnswers.length > b.correctAnswers.length) {
                return -1;
            }
            if (a.correctAnswers.length < b.correctAnswers.length) {
                return 1;
            }
            return a.totalTime - b.totalTime;
        });
        return {
            error: false,
            message: 'Get rating exam user successfully',
            data: data
        }
    } catch (error) {
        return {
            error: true,
            message: error.message || error,
            data: null
        }
    }
}
module.exports = {
    createExamUser,
    getRatingExamUserByQuestionId,
    checkExamUserExit,
    getAllExamUser,
    getRatingExam
}