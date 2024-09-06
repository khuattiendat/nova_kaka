const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    numberOfQuestions: {
        type: Number,
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, {
    timestamps: true
});
const ExamModel = mongoose.model('Exam', ExamSchema);
module.exports = ExamModel;