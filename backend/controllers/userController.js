import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc    Get current user profile
// @route   GET /api/user/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/update
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const { name, bio } = req.body;

        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;

        // Handle avatar update
        if (req.file) {
            user.avatar = `/uploads/${req.file.filename}`;
        } else if (req.body.avatar !== undefined) {
            user.avatar = req.body.avatar;
        }

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Change password
// @route   PUT /api/user/change-password
// @access  Private
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide current and new password',
            });
        }

        const user = await User.findById(req.user._id).select('+password');

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect',
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
