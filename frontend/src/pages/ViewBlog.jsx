import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FiHeart, FiMessageCircle, FiClock, FiUser } from 'react-icons/fi';
import Loader from '../components/Loader';

const ViewBlog = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await api.get(`/blog/${id}`);
            const blogData = response.data.data;
            setBlog(blogData);

            if (isAuthenticated && user) {
                setIsLiked(blogData.likes?.includes(user._id));
            }
        } catch (error) {
            toast.error('Failed to fetch blog');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to like this post');
            return;
        }

        try {
            const response = await api.post(`/blog/like/${id}`);
            setIsLiked(response.data.data.liked);
            setBlog({
                ...blog,
                likes: response.data.data.liked
                    ? [...blog.likes, user._id]
                    : blog.likes.filter((likeId) => likeId !== user._id),
            });
        } catch (error) {
            toast.error('Failed to like post');
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('Please login to comment');
            return;
        }

        if (!comment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            const response = await api.post(`/blog/comment/${id}`, { text: comment });
            setBlog({
                ...blog,
                comments: [...blog.comments, response.data.data],
            });
            setComment('');
            toast.success('Comment added');
        } catch (error) {
            toast.error('Failed to add comment');
        }
    };

    if (loading) return <Loader />;

    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog not found
                    </h2>
                    <Link to="/feed" className="text-primary-600 hover:underline">
                        Go to Feed
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Blog Content */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    {/* Image */}
                    {blog.image && (
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-96 object-cover"
                        />
                    )}

                    {/* Content */}
                    <div className="p-8">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {blog.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <FiUser />
                                <span>{blog.author?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock />
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose dark:prose-invert max-w-none mb-8">
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {blog.content}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6 pt-6 border-t dark:border-gray-700">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isLiked
                                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                <FiHeart className={isLiked ? 'fill-current' : ''} />
                                <span>{blog.likes?.length || 0}</span>
                            </button>

                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <FiMessageCircle />
                                <span>{blog.comments?.length || 0} Comments</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Comments Section */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Comments ({blog.comments?.length || 0})
                    </h2>

                    {/* Comment Form */}
                    {isAuthenticated ? (
                        <form onSubmit={handleComment} className="mb-8">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none mb-3"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                            >
                                Post Comment
                            </button>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                <Link to="/login" className="text-primary-600 hover:underline">
                                    Login
                                </Link>{' '}
                                to post a comment
                            </p>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4">
                        {blog.comments && blog.comments.length > 0 ? (
                            blog.comments.map((c) => (
                                <div
                                    key={c._id}
                                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {c.authorId?.name}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(c.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No comments yet. Be the first to comment!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBlog;
