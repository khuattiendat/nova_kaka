const express = require('express');
require('dotenv').config();
const webpush = require('web-push');
const {connect} = require('./src/config/connect');
const PORT = 8080;
const Router = require('./src/routes/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {app, server} = require('./src/socket/index');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));

const publicVapidKey = process.env.PUBLICKEY;
const privateVapidKey = process.env.PRIVATEKEY;
webpush.setVapidDetails(
    'mailto:datkt.novaedu@gmail.com',
    publicVapidKey,
    privateVapidKey
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    // Check if the subscription already exists
    const exists = subscriptions.some(sub => sub.endpoint === subscription.endpoint);

    if (!exists) {
        subscriptions.push(subscription);
    }

    res.status(201).json({subscriptions});
});

app.post('/send', async (req, res) => {
    const payload = JSON.stringify({
        title: 'Bạn có thông báo mới !!!',
        body: 'Đây là thông báo từ server',
    });
    const promises = subscriptions.map(subscription => {
        return webpush.sendNotification(subscription, payload)
    })
    await Promise.all(promises).catch(err => {
        console.log(err);
    });

    res.status(201).json({});
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

Router(app);

connect().then(() => {
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
});