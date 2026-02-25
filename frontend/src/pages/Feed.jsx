import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FiHeart, FiMessageCircle, FiClock, FiUser } from 'react-icons/fi';
import Loader from '../components/Loader';

const Feed = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    const fetchBlogs = async () => {
        try {
            const response = await api.get(`/blog/all-public?page=${page}&limit=10`);
            setBlogs(response.data.data.blogs);
            setPagination(response.data.data.pagination);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Public Feed
                </h1>

                {blogs.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No public blogs yet. Be the first to share!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {blogs.map((blog) => (
                                <article
                                    key={blog._id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                                >
                                    <div className="md:flex">
                                        {blog.image && (
                                            <div className="md:w-1/3">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="w-full h-64 md:h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className={`p-6 ${blog.image ? 'md:w-2/3' : 'w-full'}`}>
                                            <Link to={`/blog/${blog._id}`}>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition">
                                                    {blog.title}
                                                </h2>
                                            </Link>

                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                {blog.content}
                                            </p>

                                            {/* Tags */}
                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {blog.tags.slice(0, 3).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <FiUser />
                                                        <span>{blog.author?.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FiClock />
                                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <FiHeart />
                                                        <span>{blog.likes?.length || 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FiMessageCircle />
                                                        <span>{blog.comments?.length || 0}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="inline-block mt-4 text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                                            >
                                                Read more →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.pages > 1 && (
                            <div className="mt-8 flex justify-center gap-2">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
                                    Page {page} of {pagination.pages}
                                </span>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === pagination.pages}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Feed;
