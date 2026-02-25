# 🔧 LifeLog - Troubleshooting Guide

## Common Problems & Solutions

### 🚫 Problem 1: "Cannot access localhost:5173"

**Symptoms**: Browser shows "This site can't be reached"

**Solutions**:
```powershell
# Check if frontend is running
# Look for "Local: http://localhost:5173/" message

# If not running, start it:
cd "d:/tech blogs/lifelog/frontend"
npm run dev
```

---

### 🚫 Problem 2: "MongoDB connection error"

**Symptoms**: Backend shows "Error: connect ECONNREFUSED" or "MongoDB connection failed"

**Solutions**:

**Option 1 - Start MongoDB locally:**
```powershell
mongod
```

**Option 2 - Use MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifelog
```

---

### 🚫 Problem 3: "Port 5000 already in use"

**Symptoms**: Backend shows "EADDRINUSE: address already in use :::5000"

**Solutions**:

**Option 1 - Kill the process:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number you see)
taskkill /PID <PID> /F
```

**Option 2 - Change the port:**
Edit `backend/.env`:
```env
PORT=5001
```

Then update `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

---

### 🚫 Problem 4: "npm: command not found"

**Symptoms**: Terminal doesn't recognize npm

**Solutions**:
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify: `node --version` and `npm --version`

---

### 🚫 Problem 5: "Module not found" errors

**Symptoms**: Backend or frontend shows missing module errors

**Solutions**:
```powershell
# Backend
cd "d:/tech blogs/lifelog/backend"
rm -r node_modules
rm package-lock.json
npm install

# Frontend
cd "d:/tech blogs/lifelog/frontend"
rm -r node_modules
rm package-lock.json
npm install
```

---

### 🚫 Problem 6: "Blank white page" in browser

**Symptoms**: App loads but shows nothing

**Solutions**:

1. **Check browser console** (F12):
   - Look for error messages
   - Often it's an API connection issue

2. **Verify backend is running**:
   - Open http://localhost:5000 in browser
   - Should see: `{"message":"LifeLog API Server"}`

3. **Check .env file**:
```env
# frontend/.env should have:
VITE_API_URL=http://localhost:5000/api
```

4. **Hard refresh browser**:
   - Press `Ctrl + Shift + R` (Windows)
   - Or clear cache

---

### 🚫 Problem 7: "401 Unauthorized" errors

**Symptoms**: Can't access protected pages, logged out automatically

**Solutions**:

1. **Clear localStorage and login again**:
   - Press F12 in browser
   - Go to Application tab
   - Click "Clear storage"
   - Refresh and login

2. **Check JWT tokens** in `backend/.env`:
```env
JWT_ACCESS_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

---

### 🚫 Problem 8: Servers stop when closing terminal

**This is normal behavior!** Servers only run while terminal is open.

**Solutions**:

**Option 1 - Keep terminals open**
- Minimize them, don't close

**Option 2 - Create startup scripts** (see below)

**Option 3 - Use PM2 for production:**
```powershell
npm install -g pm2
cd "d:/tech blogs/lifelog/backend"
pm2 start server.js
```

---

## 🖱️ Quick Start Scripts

Create these files in your project root for easy startup:

### `start-backend.bat`
```batch
@echo off
cd "d:\tech blogs\lifelog\backend"
npm run dev
pause
```

### `start-frontend.bat`
```batch
@echo off
cd "d:\tech blogs\lifelog\frontend"
npm run dev
pause
```

### `start-all.bat`
```batch
@echo off
echo Starting LifeLog Backend...
start cmd /k "cd /d d:\tech blogs\lifelog\backend && npm run dev"

timeout /t 3

echo Starting LifeLog Frontend...
start cmd /k "cd /d d:\tech blogs\lifelog\frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause
```

**How to use**: Just double-click the `.bat` file!

---

## 🔍 How to Check if Servers are Running

### Check Backend:
```powershell
# Open in browser:
http://localhost:5000
# Should show: {"message":"LifeLog API Server"}
```

### Check Frontend:
```powershell
# Open in browser:
http://localhost:5173
# Should show the landing page
```

### Check Both Ports:
```powershell
netstat -ano | findstr "5000 5173"
# Should show listening ports
```

---

## 🆘 Emergency Restart Steps

If nothing works, follow these steps:

### 1. Stop Everything
```powershell
# Press Ctrl+C in all open terminals
# Or close all terminal windows
```

### 2. Restart MongoDB
```powershell
mongod
```

### 3. Clean Install Dependencies

**Backend:**
```powershell
cd "d:/tech blogs/lifelog/backend"
rm -r node_modules -Force
rm package-lock.json -Force
npm install
```

**Frontend:**
```powershell
cd "d:/tech blogs/lifelog/frontend"
rm -r node_modules -Force
rm package-lock.json -Force
npm install
```

### 4. Verify Environment Files

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lifelog
JWT_ACCESS_SECRET=lifelog_access_secret_2024
JWT_REFRESH_SECRET=lifelog_refresh_secret_2024
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start Fresh
```powershell
# Terminal 1 - Backend
cd "d:/tech blogs/lifelog/backend"
npm run dev

# Terminal 2 - Frontend
cd "d:/tech blogs/lifelog/frontend"
npm run dev
```

---

## 📞 Quick Command Reference

### Start Backend Only:
```powershell
cd "d:/tech blogs/lifelog/backend"
npm run dev
```

### Start Frontend Only:
```powershell
cd "d:/tech blogs/lifelog/frontend"
npm run dev
```

### Stop Servers:
```
Press Ctrl+C in each terminal
```

### Restart Servers:
```
Press Ctrl+C, then run npm run dev again
```

---

## 💡 Pro Tips

1. **Always use quotes** around paths with spaces:
   - ✅ `cd "d:/tech blogs/lifelog/backend"`
   - ❌ `cd d:/tech blogs/lifelog/backend`

2. **Keep terminals visible** so you can see errors

3. **Check console** (F12 in browser) for frontend errors

4. **Check terminal** for backend errors

5. **Test API directly**:
   - http://localhost:5000 should respond
   - Use browser or Postman

6. **Use Chrome DevTools** (F12):
   - Console: JavaScript errors
   - Network: API request failures
   - Application: Check tokens in localStorage

---

## 🎯 When to Ask for Help

If you've tried everything above and still have issues, check:
- Is MongoDB running?
- Are both `.env` files present and correct?
- Do you see any error messages in terminals?
- What error appears in browser console (F12)?

Take a screenshot of the error and we can debug it together! 🤝

---

**Remember**: Most issues are solved by simply restarting the servers! 🔄
