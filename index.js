import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// import mongoose from 'mongoose';
import dbConnection from './models/db.js';
import AuthRouter from './routes/auth/AuthRouter.js'
import ProductRouter from './routes/auth/AuthRouter.js'
import { ensureAuth } from './middlewares/Auth.js';
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT || 3000 ;

dotenv.config();
const app = express();
dbConnection();
app.use(cors());
app.use(cookieParser());


app.get('/', (req, res) => {
      res.send('Hello, world!');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)
// server listening 


app.listen(3000,()=>{
    console.log(`Server listenig at http://localhost:${PORT}`);
})