"use strict";
const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const {getMemberExam, updateStartTime} = require('../services/ExamService');
const {getRatingExam} = require('../services/ExamUserService');
require('dotenv').config();
const app = express();
const cors = require('cors');

/***socket connection */
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

/***
 * socket running at http://localhost:8080
 */

io.on('connection', async (socket) => {
    console.log('a user connected', socket.id);

    //phong-cho
    socket.on('phong-cho', async (data) => {
        try {
            const {examId} = data;
            const members = await getMemberExam(examId);
            io.emit('phong-cho', members.data);
        } catch (error) {
            console.error('Error in phong-cho event:', error);
        }
    });

    // update-start-time
    socket.on('update-start-time', async (data) => {
        try {
            const {examId} = data;
            let date = new Date();
            let startTime = `${date.getHours()}:${date.getMinutes()}`;
            await updateStartTime(examId, startTime);
            io.emit('exam-started');
        } catch (error) {
            console.error('Error in update-start-time event:', error);
        }
    });

    // next-question
    socket.on('next-question', (data) => {
        const {index} = data;
        io.emit('next-question', {index});
    });

    // rating
    socket.on('rating', async (data) => {
        try {
            const {examId} = data;
            const rating = await getRatingExam(examId);
            io.emit('rating', {rating: rating.data});
        } catch (error) {
            console.error('Error in rating event:', error);
        }
    });

    // disconnect
    socket.on('disconnect', () => {
        console.log('disconnect user', socket.id);
    });
});

module.exports = {
    app,
    server
};