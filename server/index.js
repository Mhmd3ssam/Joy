import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import testApi from './routes/test.js';

const app = express();

app.use(bodyParser.json({extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


app.use('/joy',testApi);
const PORT = 3000;
app.listen(PORT,()=>{
    console.log('server listen in port 3000')
})