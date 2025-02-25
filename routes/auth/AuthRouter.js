import { login, registration, authMiddlewares } from '../../controllers/auth/userController.js';
import { registerValidation, loginValidation } from '../../middlewares/AuthValidation.js';

import express from 'express'

const router = express.Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, registration);
router.get('/authCheck', authMiddlewares, (req, res) => res.status(200).json(req.user));

 
export default router
