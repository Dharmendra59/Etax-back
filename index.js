import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import dbConnection from './models/db.js';
import AuthRouter from './routes/auth/AuthRouter.js'


const PORT = process.env.PORT || 3000 ;

dotenv.config();
const app = express();
dbConnection();
app.use(cors());


app.get('/', (req, res) => {
      res.send('Hello, world!');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter)
// server listening 


app.listen(3000,()=>{
    console.log(`Server listenig at http://localhost:${PORT}`);
})