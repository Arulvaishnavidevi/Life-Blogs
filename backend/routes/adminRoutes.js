import express from 'express';
import {
    getAllUsers,
    deleteUser,
    toggleBlockUser,
    getAllBlogs,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and admin only
router.use(protect, admin);

router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.put('/user/block/:id', toggleBlockUser);
router.get('/blogs', getAllBlogs);

export default router;
