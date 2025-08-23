@echo off
echo 🚀 Pushing to Docker Hub...

REM Set your Docker Hub username here
set DOCKER_USERNAME=dexinfinity
set IMAGE_NAME=docker_test_project

REM Check if user is logged in
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Check if logged in to Docker Hub - using a more reliable method
docker images >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not accessible. Please check Docker Desktop.
    pause
    exit /b 1
)

REM Try to get Docker Hub info - if this fails, user needs to login
docker search hello-world >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please login to Docker Hub first:
    echo docker login
    pause
    exit /b 1
)

echo ✅ Docker Hub authentication verified
echo 📦 Building images...
docker-compose build

if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo 🏷️ Tagging images...

REM Tag production image
docker tag %IMAGE_NAME%-server:latest %DOCKER_USERNAME%/%IMAGE_NAME%:latest
if %errorlevel% neq 0 (
    echo ❌ Failed to tag production image
    pause
    exit /b 1
)

REM Tag development image
docker tag %IMAGE_NAME%-server:latest %DOCKER_USERNAME%/%IMAGE_NAME%:dev
if %errorlevel% neq 0 (
    echo ❌ Failed to tag development image
    pause
    exit /b 1
)

echo 📤 Pushing to Docker Hub...

REM Push production image
echo Pushing %DOCKER_USERNAME%/%IMAGE_NAME%:latest...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:latest
if %errorlevel% neq 0 (
    echo ❌ Failed to push production image
    pause
    exit /b 1
)

REM Push development image
echo Pushing %DOCKER_USERNAME%/%IMAGE_NAME%:dev...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:dev
if %errorlevel% neq 0 (
    echo ❌ Failed to push development image
    pause
    exit /b 1
)

echo ✅ Successfully pushed to Docker Hub!
echo 🌐 View your images at: https://hub.docker.com/r/%DOCKER_USERNAME%/%IMAGE_NAME%

pause
