require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require('./mongoDB'); db();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.json({ limit: '10mb' }));
const options = [
    cors({
        origin: '*',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
];

app.use(options);
const oneHour = 1000 * 60 * 60;
app.use(
    session({
        secret: "vikaskumar",
        saveUninitialized: true,
        cookie: { maxAge: oneHour },
        resave: false,
    })
);

app.use('/', require('./routers/userRouter'))
app.use('/', require('./routers/courseHistory.router'))
app.use('/', require('./routers/certificateUpload.router'))
app.use(express.static(path.join(__dirname, "certificate")));
app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');

});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));