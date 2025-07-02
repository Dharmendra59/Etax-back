import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnection from './models/db.js';
import AuthRouter from './routes/auth/AuthRouter.js';
import cookieParser from "cookie-parser";
import contactRoute from './routes/auth/ContactRouter.js';
// import FileRouter from './routes/auth/FileRouter.js';
import GoogleAuthRouter from './routes/auth/GoogleAuthRouter.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
dbConnection();

// app.use(cors({
//     origin: "*",
//     credentials: true
// }));
// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://www.quickfinancialservices.org"
  ],
  credentials: true,
}));

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/auth/google-login', GoogleAuthRouter);
app.use('/contact-data', contactRoute);
// app.use('/file', FileRouter);

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
});

// Routes
app.use('/api', uploadRoutes);


app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
