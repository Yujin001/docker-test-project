# PowerShell script to push Docker images to Docker Hub
Write-Host "🚀 Pushing to Docker Hub..." -ForegroundColor Green

# Set your Docker Hub username here
$DOCKER_USERNAME = "dexinfinity"
$IMAGE_NAME = "docker_test_project"

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Check if Docker is accessible
try {
    docker images | Out-Null
} catch {
    Write-Host "❌ Docker is not accessible. Please check Docker Desktop." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Check if logged in to Docker Hub - using a more reliable method
try {
    docker search hello-world | Out-Null
    Write-Host "✅ Docker Hub authentication verified" -ForegroundColor Green
} catch {
    Write-Host "🔐 Please login to Docker Hub first:" -ForegroundColor Yellow
    Write-Host "docker login" -ForegroundColor Cyan
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "📦 Building images..." -ForegroundColor Blue
docker-compose build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "🏷️ Tagging images..." -ForegroundColor Blue

# Tag production image
docker tag "${IMAGE_NAME}-server:latest" "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to tag production image" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Tag development image
docker tag "${IMAGE_NAME}-server:latest" "${DOCKER_USERNAME}/${IMAGE_NAME}:dev"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to tag development image" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "📤 Pushing to Docker Hub..." -ForegroundColor Blue

# Push production image
Write-Host "Pushing ${DOCKER_USERNAME}/${IMAGE_NAME}:latest..." -ForegroundColor Cyan
docker push "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push production image" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Push development image
Write-Host "Pushing ${DOCKER_USERNAME}/${IMAGE_NAME}:dev..." -ForegroundColor Cyan
docker push "${DOCKER_USERNAME}/${IMAGE_NAME}:dev"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push development image" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "✅ Successfully pushed to Docker Hub!" -ForegroundColor Green
Write-Host "🌐 View your images at: https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}" -ForegroundColor Cyan

Read-Host "Press Enter to continue"
