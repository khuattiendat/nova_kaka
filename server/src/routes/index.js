const UserRouter = require('./UserRouter');
const QuestionRouter = require('./QuestionRouter');
const ExamRouter = require('./ExamRouter');
const ExamUserRouter = require('./ExamUserRouter');

const Router = (app) => {
    app.use('/api/users', UserRouter)
    app.use('/api/questions', QuestionRouter)
    app.use('/api/exams', ExamRouter)
    app.use('/api/exam-users', ExamUserRouter)
}
module.exports = Router;