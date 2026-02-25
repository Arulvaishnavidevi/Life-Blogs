import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            dispatch(logout());
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            dispatch(logout());
            navigate('/');
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        LifeLog
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/feed"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                        >
                            Feed
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/create"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                                >
                                    Create
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                                >
                                    Profile
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                        >
                            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                        >
                            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            to="/feed"
                            className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Feed
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/create"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Create
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
