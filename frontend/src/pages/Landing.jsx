import { Link } from 'react-router-dom';
import { FiBook, FiLock, FiZap, FiUsers } from 'react-icons/fi';

const Landing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Welcome to <span className="text-primary-600 dark:text-primary-400">LifeLog</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        Your secure platform to share daily life updates, adventures, skills, and learning experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="px-8 py-4 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all shadow-lg"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/feed"
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all border-2 border-primary-600"
                        >
                            Explore Feed
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all animate-slide-up">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                            <FiBook className="text-2xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Daily Journaling
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Document your daily activities, thoughts, and experiences with ease.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                            <FiLock className="text-2xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Secure & Private
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your data is protected with JWT authentication and encryption.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                            <FiZap className="text-2xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Fast & Modern
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Built with React and powered by modern web technologies.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                            <FiUsers className="text-2xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Community
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Share your public posts and connect with like-minded individuals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
