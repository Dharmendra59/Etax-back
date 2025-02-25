import { login, registration } from '../../controllers/auth/userController.js';
import { registerValidation, loginValidation } from '../../middlewares/AuthValidation.js';

import express from 'express'

const router = express.Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, registration);
 
export default router
