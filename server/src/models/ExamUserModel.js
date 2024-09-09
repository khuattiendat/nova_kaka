const mongoose = require('mongoose');
const ExamUserSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers:
        [{
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            answer: {
                type: String,
            },
            timeAnswered: { // thời gian làm bài (s)
                type: Number,
                default: 0
            },
            score: {
                type: Number,
                default: 0
            }
        }],
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
const ExamUserModel = mongoose.model('ExamUser', ExamUserSchema);
module.exports = ExamUserModel;