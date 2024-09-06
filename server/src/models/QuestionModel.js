const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            option: {
                type: String,
                required: [true, 'option is required']
            },
            isAnswer: {
                type: Boolean,
                default: false
            }
        }
    ],
    time: {
        type: Number,
    }
}, {
    timestamps: true
});
const QuestionModel = mongoose.model('Question', QuestionSchema);
module.exports = QuestionModel;