import express from 'express'
import { fileGet, fileSubmit } from '../../controllers/auth/FileController.js';
const router = express.Router();

router.post('/file_submit',fileSubmit);
router.get('/file_get',fileGet);

export default router;