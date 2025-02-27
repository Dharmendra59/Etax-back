import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnection from './models/db.js';
import AuthRouter from './routes/auth/AuthRouter.js';
import cookieParser from "cookie-parser"
import contactRoute from './routes/auth/ContactRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser())
dbConnection();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/contact-data',contactRoute);


app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});