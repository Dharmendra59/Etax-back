import { registration, login, authMiddleware } from '../../controllers/auth/userController.js';
import { registerValidation, loginValidation } from '../../middlewares/AuthValidation.js';

import express from 'express'
import UserModel from '../../models/User.js';

const router = express.Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, registration);

router.get("/checkauth", authMiddleware, async (req, res) => {
    try {
        const result = req.result; // Extracted from authMiddleware

        const user = await UserModel.findById(result.id).select("-password"); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error in /checkauth:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router