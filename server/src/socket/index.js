const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const {getMemberExam, getExamById, updateStartTime, getQuestionByIndex} = require("../services/ExamService");
const {
    getRatingExamUserByQuestionId,
    checkExamUserExit,
    getRatingExam
} = require("../services/ExamUserService");
const {checkCountQuestion} = require("../services/QuestionService");
require('dotenv').config()
const app = express()

/***socket connection */

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
})
/***
 * socket running at http://localhost:8080
 */

try {
    io.on('connection', async (socket) => {
        console.log('a user connected', socket.id)
        //phong-cho
        socket.on('phong-cho', async (data) => {
            const {examId} = data
            const members = await getMemberExam(examId)
            io.emit('phong-cho', members.data)
        })
        socket.on('update-start-time', (data) => {
            const {examId} = data;
            let date = new Date();
            let startTime = `${date.getHours()}:${date.getMinutes()}`;
            updateStartTime(examId, startTime)
            io.emit('exam-started')
        })
        // exam
        // socket.on('exam', async (data) => {
        //     try {
        //         const {id, index, userId} = data
        //         console.log(data)
        //         const question = await getQuestionByIndex(id, index)
        //         const countQuestion = await checkCountQuestion()
        //         const checkUser = await checkExamUserExit(userId, id, question?.data._id)
        //         if (checkUser.data) {
        //             io.emit('exam', {
        //                 userExit: true,
        //                 question: question.data,
        //                 totalQuestion: countQuestion.data
        //             })
        //             return;
        //         }
        //
        //         io.emit('exam', {
        //             question: question.data,
        //             totalQuestion: countQuestion.data
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }
        // })
        // rating
        socket.on('get-rating', async (data) => {
            const {examId, questionId} = data
            const rating = await getRatingExamUserByQuestionId(examId, questionId)
            io.emit('get-rating', rating.data)
            const countQuestion = await checkCountQuestion()
            io.emit('total-question', countQuestion.data)
        })
        socket.on('next-question', (data) => {
            const {index} = data
            io.emit('next-question', {
                index: index
            })
        })
        socket.on('view-answer', (data) => {
            io.emit('view-answer', {
                view: !data.view
            })
        })
        // rating all
        socket.on('rating', async (data) => {
            const {examId} = data
            const rating = await getRatingExam(examId)
            io.emit('rating', {
                rating: rating.data,
            })
        })
        //disconnect
        socket.on('disconnect', () => {
            console.log('disconnect user ', socket.id)
        })
    })
} catch (error) {
    console.log(error)
}
module.exports = {
    app,
    server
}
