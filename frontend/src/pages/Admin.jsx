import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FiTrash2, FiShield, FiUsers, FiFileText } from 'react-icons/fi';
import Loader from '../components/Loader';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        } else {
            fetchBlogs();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/admin/blogs');
            setBlogs(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.delete(`/admin/user/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleBlockUser = async (id) => {
        try {
            const response = await api.put(`/admin/user/block/${id}`);
            setUsers(
                users.map((user) =>
                    user._id === id ? { ...user, isBlocked: response.data.data.isBlocked } : user
                )
            );
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to block/unblock user');
        }
    };

    const handleDeleteBlog = async (id) => {
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
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Admin Panel
                </h1>

                {/* Tabs */}
                <div className="mb-6 flex gap-4">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'users'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <FiUsers />
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${activeTab === 'blogs'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <FiFileText />
                        All Blogs
                    </button>
                </div>

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Manage Users ({users.length})
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isBlocked
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                        }`}
                                                >
                                                    {user.isBlocked ? 'Blocked' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleBlockUser(user._id)}
                                                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition"
                                                        title={user.isBlocked ? 'Unblock' : 'Block'}
                                                    >
                                                        <FiShield />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Blogs Tab */}
                {activeTab === 'blogs' && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                All Blogs ({blogs.length})
                            </h2>
                        </div>

                        <div className="divide-y dark:divide-gray-700">
                            {blogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                {blog.content}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>By: {blog.author?.name}</span>
                                                <span>•</span>
                                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className={blog.isPublic ? 'text-green-600' : 'text-red-600'}>
                                                    {blog.isPublic ? 'Public' : 'Private'}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteBlog(blog._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition ml-4"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
