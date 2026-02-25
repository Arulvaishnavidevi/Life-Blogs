@echo off
echo ========================================
echo      Starting LifeLog Application
echo ========================================
echo.
echo Starting Backend Server...
start "LifeLog Backend" cmd /k "cd /d d:\tech blogs\lifelog\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "LifeLog Frontend" cmd /k "cd /d d:\tech blogs\lifelog\frontend && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Wait 5-10 seconds, then open:
echo http://localhost:5173
echo.
pause
