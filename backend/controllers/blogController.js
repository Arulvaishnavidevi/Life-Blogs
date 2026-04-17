import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// @desc    Create blog
// @route   POST /api/blog/create
// @access  Private
export const createBlog = async (req, res) => {
    try {
        const { title, content, isPublic, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title and content',
            });
        }

        // Get image path from uploaded file or use provided URL
       const imagePath = req.file
    ? req.file.path
    : req.body.image || '';

        const blog = await Blog.create({
            title,
            content,
            image: imagePath,
            isPublic: isPublic !== undefined ? isPublic : true,
            tags: tags ? JSON.parse(tags) : [],
            author: req.user._id,
        });

        const populatedBlog = await Blog.findById(blog._id).populate(
            'author',
            'name email avatar'
        );

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: populatedBlog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Update blog
// @route   PUT /api/blog/update/:id
// @access  Private
export const updateBlog = async (req, res) => {
    try {
        const { title, content, isPublic, tags } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this blog',
            });
        }

        // Update fields
        if (title) blog.title = title;
        if (content) blog.content = content;

        // Handle image update
        if (req.file) {
    blog.image = req.file.path;

        } else if (req.body.image !== undefined) {
            blog.image = req.body.image;
        }

        if (isPublic !== undefined) blog.isPublic = isPublic;
        if (tags) blog.tags = JSON.parse(tags);

        await blog.save();

        const updatedBlog = await Blog.findById(blog._id).populate(
            'author',
            'name email avatar'
        );

        res.json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blog/delete/:id
// @access  Private
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Check if user is the author or admin
        if (
            blog.author.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this blog',
            });
        }

        // Delete associated comments
        await Comment.deleteMany({ blogId: blog._id });

        await blog.deleteOne();

        res.json({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Get all public blogs
// @route   GET /api/blog/all-public
// @access  Public
export const getAllPublicBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find({ isPublic: true })
            .populate('author', 'name email avatar')
            .populate({
                path: 'comments',
                populate: { path: 'authorId', select: 'name avatar' },
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments({ isPublic: true });

        res.json({
            success: true,
            data: {
                blogs,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Get my blogs
// @route   GET /api/blog/my-blogs
// @access  Private
export const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })
            .populate('author', 'name email avatar')
            .populate({
                path: 'comments',
                populate: { path: 'authorId', select: 'name avatar' },
            })
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

// @desc    Get single blog
// @route   GET /api/blog/:id
// @access  Public
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'name email avatar bio')
            .populate({
                path: 'comments',
                populate: { path: 'authorId', select: 'name avatar' },
                options: { sort: { createdAt: -1 } },
            });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Check if blog is private and user is not the author
        if (!blog.isPublic) {
            if (!req.user || blog.author._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'This blog is private',
                });
            }
        }

        res.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Like/Unlike blog
// @route   POST /api/blog/like/:id
// @access  Private
export const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Check if already liked
        const likeIndex = blog.likes.indexOf(req.user._id);

        if (likeIndex > -1) {
            // Unlike
            blog.likes.splice(likeIndex, 1);
            await blog.save();

            res.json({
                success: true,
                message: 'Blog unliked',
                data: { liked: false, likesCount: blog.likes.length },
            });
        } else {
            // Like
            blog.likes.push(req.user._id);
            await blog.save();

            res.json({
                success: true,
                message: 'Blog liked',
                data: { liked: true, likesCount: blog.likes.length },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// @desc    Add comment to blog
// @route   POST /api/blog/comment/:id
// @access  Private
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Please provide comment text',
            });
        }

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Create comment
        const comment = await Comment.create({
            blogId: blog._id,
            authorId: req.user._id,
            text,
        });

        // Add comment to blog
        blog.comments.push(comment._id);
        await blog.save();

        // Populate comment
        const populatedComment = await Comment.findById(comment._id).populate(
            'authorId',
            'name avatar'
        );

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            data: populatedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
