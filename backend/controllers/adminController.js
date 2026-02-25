import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password -refreshToken');

        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete your own account',
            });
        }

        // Delete user's blogs and comments
        const userBlogs = await Blog.find({ author: user._id });
        for (const blog of userBlogs) {
            await Comment.deleteMany({ blogId: blog._id });
            await blog.deleteOne();
        }

        await Comment.deleteMany({ authorId: user._id });
        await user.deleteOne();

        res.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/user/block/:id
// @access  Private/Admin
export const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Prevent blocking yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot block your own account',
            });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({
            success: true,
            message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
            data: { isBlocked: user.isBlocked },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Get all blogs (including private)
// @route   GET /api/admin/blogs
// @access  Private/Admin
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
