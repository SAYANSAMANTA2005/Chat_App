@echo off
echo ========================================
echo   Chat App - Git Setup Script
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/4] Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)

echo.
echo [2/4] Adding files to Git...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)

echo.
echo [3/4] Creating initial commit...
git commit -m "Initial commit - Chat App ready for deployment"
if errorlevel 1 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)

echo.
echo [4/4] Repository ready!
echo.
echo ========================================
echo   SUCCESS! Git repository created
echo ========================================
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Run these commands to push your code:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/chat-app.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo Then follow the DEPLOYMENT.md guide to deploy to Render!
echo.
pause
