@echo off
title FranchiseHub Launcher
color 0A

echo ================================
echo   FranchiseHub - Starting App
echo ================================
echo.

:: Kill any existing node processes on ports 3000 and 5000
echo Cleaning up old processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000 " ^| findstr "LISTENING"') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do taskkill /PID %%a /F >nul 2>&1

timeout /t 2 /nobreak >nul

:: Start Backend
echo Starting Backend Server...
start "Backend - Port 5000" cmd /k "cd /d E:\project 1 && node server.js"

timeout /t 4 /nobreak >nul

:: Start Frontend
echo Starting Frontend...
start "Frontend - Port 3000" cmd /k "cd /d E:\project 1\client && npm start"

echo.
echo ================================
echo   Waiting for app to compile...
echo   This takes about 20 seconds
echo ================================

timeout /t 25 /nobreak >nul

:: Open browser
start http://localhost:3000

echo.
echo ================================
echo   App is LIVE!
echo   Laptop:  http://localhost:3000
echo ================================
echo.
echo DO NOT close the other terminals!
pause
