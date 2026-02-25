import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        blogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: [true, 'Please provide comment text'],
            trim: true,
            maxlength: [1000, 'Comment cannot exceed 1000 characters'],
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
