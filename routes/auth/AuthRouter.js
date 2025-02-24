import { registration } from '../../controllers/auth/userController.js';
import { registerValidation } from '../../middlewares/AuthValidation.js';

import express from 'express'

const router = express.Router();

router.post('/login', (req,res)=>{
      res.send('LogIn Success..');
})
router.post('/register', registerValidation, registration)

export default router