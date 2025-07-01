import express from 'express';
import { fileSubmit, fileGet, fileDelete } from '../../controllers/auth/FileController.js';
import upload from '../../middlewares/cloudinaryMiddle.js';

const router = express.Router();

// Form Submit with File Upload
router.post('/file_submit', upload.single('file'), fileSubmit);

// Get Queries
router.get('/file_get', fileGet);

// Delete a file entry
router.delete('/delete/:id', fileDelete);

export default router;