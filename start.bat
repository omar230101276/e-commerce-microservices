@echo off
TITLE E-Commerce Project Launcher

echo ===================================================
echo      Welcome to the E-Commerce Project Setup
echo ===================================================
echo.

:: Check if Docker is running
docker info >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker is NOT running!
    echo.
    echo Please make sure you have installed Docker Desktop and it is currently running.
    echo You can download it from: https://www.docker.com/products/docker-desktop/
    echo.
    echo Once installed and running, try running this script again.
    echo.
    pause
    exit /b
)

echo [OK] Docker is running.
echo.
echo Starting the project... (This may take a few minutes for the first build)
echo.

docker-compose up --build

echo.
echo If the project stopped unexpectedly, please check the error messages above.
pause
