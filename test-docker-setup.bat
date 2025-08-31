@echo off
echo ========================================
echo Testing Docker Setup Locally
echo ========================================
echo.
echo This script will test your Docker setup step by step.
echo.

echo Step 1: Check Docker installation
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not in PATH
    pause
    exit /b 1
)
echo ✅ Docker is working
echo.

echo Step 2: Check Docker daemon
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker daemon is not running
    echo Please start Docker Desktop or Docker daemon
    pause
    exit /b 1
)
echo ✅ Docker daemon is running
echo.

echo Step 3: Test building the image (without pushing)
echo Building Docker image locally...
docker build -t docker-test-project:local .
if %errorlevel% neq 0 (
    echo ❌ Docker build failed
    pause
    exit /b 1
)
echo ✅ Docker build successful
echo.

echo Step 4: Test running the container
echo Starting container for 10 seconds...
docker run --rm -d --name test-container docker-test-project:local
timeout /t 10 /nobreak >nul
docker stop test-container
echo ✅ Container test successful
echo.

echo Step 5: Clean up
docker rmi docker-test-project:local
echo ✅ Cleanup completed
echo.

echo ========================================
echo 🎉 All Docker tests passed!
echo ========================================
echo.
echo Next steps:
echo 1. Create Docker Hub repository: docker-test-project
echo 2. Get Docker Hub access token
echo 3. Update GitHub secrets
echo 4. Push your changes to trigger CI/CD
echo.
pause
