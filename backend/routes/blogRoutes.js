import express from 'express';
import {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllPublicBlogs,
    getMyBlogs,
    getBlogById,
    likeBlog,
    addComment,
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/all-public', getAllPublicBlogs);
router.get('/my-blogs', protect, getMyBlogs);
router.get('/:id', getBlogById);
router.post('/create', protect, upload.single('image'), createBlog);
router.put('/update/:id', protect, upload.single('image'), updateBlog);
router.delete('/delete/:id', protect, deleteBlog);
router.post('/like/:id', protect, likeBlog);
router.post('/comment/:id', protect, addComment);

export default router;
