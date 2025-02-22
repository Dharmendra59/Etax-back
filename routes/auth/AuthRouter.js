// import { registration } from '../../controllers/auth/userController';
import { registerValidation } from '../../middlewares/AuthValidation';
import express from 'express'

const router = express.Router();

router.post('/login', (req,res)=>{
      res.send('LogIn Success..');
})
router.post('/register', registerValidation)

export default router