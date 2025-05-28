import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileGet, fileSubmit } from '../../controllers/auth/FileController.js';
// import { upload } from '../../middlewares/cloudinaryMiddle.js';
// import upload from '../../middlewares/cloudinaryMiddle.js';
const upload = require('../../middlewares/cloudinaryMiddle');



const router = express.Router();

// Ensure uploads directory exists
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// Configure multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });

router.post('/file_submit', upload.single('file'), fileSubmit);
router.get('/file_get', fileGet);

export default router;
