# 🖼️ Image Display Fix

## Problem
Images uploaded to the backend are stored as `/uploads/filename.jpg` but need the full backend URL to display in the frontend.

## Solution

I've created a helper function `getImageUrl()` in `src/utils/imageHelper.js`.

### How to Use:

1. **Import the helper:**
```javascript
import { getImageUrl } from '../utils/imageHelper';
```

2. **Use it in your image src:**
```javascript
// Instead of:
<img src={blog.image} />

// Use:
<img src={getImageUrl(blog.image)} />
```

### Files That Need This Fix:

- ✅ `ViewBlog.jsx` - Already fixed
- ❌ `Dashboard.jsx` - Line 155
- ❌ `Feed.jsx` - Line 57
- ❌ `Admin.jsx` - Line 152 (if blog images are shown in admin)
- ✅ `Profile.jsx` - Already handles this
- ✅ `EditBlog.jsx` - Already handles this

### Quick Manual Fix:

For any page showing blog images, find the `<img>` tag and update it:

**Dashboard.jsx** (around line 155):
```javascript
<img
  src={getImageUrl(blog.image)}  // Add this helper
  alt={blog.title}
  className="w-full h-48 object-cover"
/>
```

**Feed.jsx** (around line 57):
```javascript
<img
  src={getImageUrl(blog.image)}  // Add this helper
  alt={blog.title}
  className="w-full h-64 md:h-full object-cover"
/>
```

Don't forget to import at the top of each file:
```javascript
import { getImageUrl } from '../utils/imageHelper';
```

### Why This Happens:

- Backend stores: `/uploads/blog-123456.jpg`
- Frontend needs: `http://localhost:5000/uploads/blog-123456.jpg`
- The helper handles both cases (URLs and uploaded files)

**That's it! Images will now display correctly! 🎉**
