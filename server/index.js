"use strict";
const express = require('express');
require('dotenv').config();
const connect = require('./src/config/connect');
const PORT = 8080;
const Router = require('./src/routes/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {app, server} = require('./src/socket/index')
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
Router(app);

connect().then(() => {
    server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        }
    )
})