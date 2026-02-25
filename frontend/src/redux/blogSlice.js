import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setCurrentBlog: (state, action) => {
            state.currentBlog = action.payload;
        },
        addBlog: (state, action) => {
            state.blogs.unshift(action.payload);
        },
        updateBlog: (state, action) => {
            const index = state.blogs.findIndex((blog) => blog._id === action.payload._id);
            if (index !== -1) {
                state.blogs[index] = action.payload;
            }
            if (state.currentBlog?._id === action.payload._id) {
                state.currentBlog = action.payload;
            }
        },
        removeBlog: (state, action) => {
            state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setBlogs,
    setCurrentBlog,
    addBlog,
    updateBlog,
    removeBlog,
    setLoading,
    setError,
} = blogSlice.actions;

export default blogSlice.reducer;
