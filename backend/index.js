const cors  =require('cors');//to allow cross origin resource sharing
const express = require('express');
const app = express();
app.use(express.json());//to parse json data
require('dotenv').config();//to use .env file
app.use(cors());//to allow cross origin resource sharing

//import routes
const questionRouter = require('./routers/questionRouter');
const userRouter = require('./routers/userRouter');
const sessionRouter = require('./routers/sessionRouter');


//api routes
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/session', sessionRouter);


//import db funtion
const connectDB =require('./database/db');
connectDB();//dtabase connection
app.get('/', (req, res) => {
    return res.send('Api is running....')
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Server is running at port ' + `${port}`);
})