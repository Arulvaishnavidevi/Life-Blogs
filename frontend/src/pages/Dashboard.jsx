import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiLock, FiUnlock } from 'react-icons/fi';
import Loader from '../components/Loader';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const fetchMyBlogs = async () => {
        try {
            const response = await api.get('/blog/my-blogs');
            setBlogs(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            await api.delete(`/blog/delete/${id}`);
            setBlogs(blogs.filter((blog) => blog._id !== id));
            toast.success('Blog deleted successfully');
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your blog posts and track your journey.
                    </p>
                </div>

                {/* Create Button */}
                <div className="mb-8">
                    <Link
                        to="/create"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition transform hover:scale-105 shadow-lg"
                    >
                        <FiPlus className="mr-2" />
                        Create New Blog
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Blogs</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{blogs.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Public Blogs</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {blogs.filter((b) => b.isPublic).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Private Blogs</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {blogs.filter((b) => !b.isPublic).length}
                        </p>
                    </div>
                </div>

                {/* Blogs List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Blogs</h2>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                                You haven't created any blogs yet.
                            </p>
                            <Link
                                to="/create"
                                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                            >
                                <FiPlus className="mr-2" />
                                Create Your First Blog
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y dark:divide-gray-700">
                            {blogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {blog.title}
                                                </h3>
                                                {blog.isPublic ? (
                                                    <FiUnlock className="text-green-500" title="Public" />
                                                ) : (
                                                    <FiLock className="text-red-500" title="Private" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                {blog.content.substring(0, 150)}...
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>{blog.likes?.length || 0} likes</span>
                                                <span>•</span>
                                                <span>{blog.comments?.length || 0} comments</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-4">
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition"
                                                title="View"
                                            >
                                                <FiEye className="text-xl" />
                                            </Link>
                                            <Link
                                                to={`/edit/${blog._id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <FiEdit className="text-xl" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                                                title="Delete"
                                            >
                                                <FiTrash2 className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
