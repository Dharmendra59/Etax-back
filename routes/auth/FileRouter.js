import express from 'express';
import { fileSubmit, fileGet } from '../../controllers/auth/FileController.js';
import upload from '../../middlewares/cloudinaryMiddle.js';

const router = express.Router();

// Single File Upload Route (Optional)
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    return res.status(200).json({
        message: 'File uploaded successfully!',
        url: req.file?.path || req.file?.url || req.file?.secure_url
    });
});

// Form Submit with File Upload
router.post('/file_submit', upload.single('file'), fileSubmit);

// Get Queries
router.get('/file_get', fileGet);

export default router;
