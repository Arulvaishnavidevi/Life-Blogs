import express from 'express';
import { getMe, updateProfile, changePassword } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/update', protect, upload.single('avatar'), updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
