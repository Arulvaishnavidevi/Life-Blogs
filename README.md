# LifeLog - Secure Blog Website Application

A full-stack blogging platform with JWT authentication, allowing users to share their daily life updates, adventures, skills, and learning experiences.

## Features

### User Features
- 🔐 Secure authentication with JWT (Access + Refresh tokens)
- ✍️ Create, Read, Update, Delete blog posts
- 🔒 Public/Private visibility for posts
- 💬 Like and comment on blog posts
- 👤 User profile management
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design

### Admin Features
- 👥 Manage all users
- 🗑️ Delete any user or blog post
- 🚫 Block/Unblock users
- 📊 View all blogs (public and private)

## Tech Stack

### Frontend
- **React** 18 with **Vite**
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **React Icons** for icons

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **express-rate-limit** for rate limiting
- **express-mongo-sanitize** for NoSQL injection prevention

## Project Structure

```
lifelog/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Loader.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── CreateBlog.jsx
    │   │   ├── EditBlog.jsx
    │   │   ├── ViewBlog.jsx
    │   │   ├── Feed.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Settings.jsx
    │   │   └── Admin.jsx
    │   ├── redux/
    │   │   ├── authSlice.js
    │   │   ├── blogSlice.js
    │   │   └── store.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lifelog
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user (protected)

### Blog
- `GET /api/blog/all-public` - Get all public blogs
- `GET /api/blog/my-blogs` - Get user's blogs (protected)
- `GET /api/blog/:id` - Get single blog
- `POST /api/blog/create` - Create blog (protected)
- `PUT /api/blog/update/:id` - Update blog (protected)
- `DELETE /api/blog/delete/:id` - Delete blog (protected)
- `POST /api/blog/like/:id` - Like/Unlike blog (protected)
- `POST /api/blog/comment/:id` - Add comment (protected)

### User
- `GET /api/user/me` - Get current user (protected)
- `PUT /api/user/update` - Update profile (protected)
- `PUT /api/user/change-password` - Change password (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/user/:id` - Delete user (admin only)
- `PUT /api/admin/user/block/:id` - Block/Unblock user (admin only)
- `GET /api/admin/blogs` - Get all blogs (admin only)

## Security Features

✅ **Password Hashing** - bcrypt with salt rounds  
✅ **JWT Authentication** - Access and refresh tokens  
✅ **Protected Routes** - Middleware-based authorization  
✅ **Input Validation** - express-validator  
✅ **CORS** - Configured for frontend origin  
✅ **Helmet** - Security headers  
✅ **Rate Limiting** - Prevents abuse  
✅ **NoSQL Injection Prevention** - express-mongo-sanitize  
✅ **Role-Based Access** - User and Admin roles  

## Usage

### Creating an Account
1. Visit `http://localhost:5173`
2. Click "Sign Up"
3. Fill in your details
4. You'll be automatically logged in

### Creating a Blog Post
1. Login to your account
2. Go to "Create" in the navbar
3. Fill in the title, content, optional image URL, and tags
4. Choose visibility (Public/Private)
5. Click "Create Blog"

### Admin Access
To create an admin user, manually update a user's role in the MongoDB database:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Default Credentials
There are no default credentials. You need to create a new account to get started.

## Development Notes

- The backend uses ES6 modules (`"type": "module"` in package.json)
- JWT tokens are stored in localStorage on the frontend
- Refresh token mechanism automatically renews expired access tokens
- Dark mode preference is persisted in localStorage
- All API responses follow a consistent format

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance
3. Generate secure JWT secrets
4. Set up proper CORS origins
5. Use a process manager like PM2

### Frontend
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` folder to your hosting service
3. Update the `VITE_API_URL` to your production backend URL

## Contributing
Feel free to submit issues and enhancement requests!

## License
ISC
