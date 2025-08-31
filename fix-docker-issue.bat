@echo off
echo ========================================
echo Docker Hub Issue Fixer
echo ========================================
echo.
echo The CI/CD pipeline failed because of Docker Hub issues.
echo Let's fix this step by step:
echo.
echo 1. FIRST: Create the Docker Hub repository
echo    - Go to https://hub.docker.com/
echo    - Sign in with your account (yujin001)
echo    - Click "Create Repository"
echo    - Repository name: docker-test-project
echo    - Make it Public or Private (your choice)
echo    - Click "Create"
echo.
echo 2. SECOND: Check your Docker Hub credentials
echo    - Go to https://hub.docker.com/settings/security
echo    - Create a new Access Token (not your password!)
echo    - Give it a name like "GitHub Actions CI/CD"
echo    - Copy the token
echo.
echo 3. THIRD: Update GitHub Secrets
echo    - Go to your GitHub repository
echo    - Settings > Secrets and variables > Actions
echo    - Update DOCKER_USERNAME: yujin001
echo    - Update DOCKER_PASSWORD: [your access token from step 2]
echo.
echo 4. FOURTH: Test locally (optional)
echo    - docker login
echo    - Enter username: yujin001
echo    - Enter password: [your access token]
echo.
echo 5. FIFTH: Alternative - Use different repository name
echo    If you want to use a different name, update the workflow:
echo    - Edit .github/workflows/ci-cd.yml
echo    - Change IMAGE_NAME to your preferred name
echo.
echo ========================================
echo Common Issues and Solutions:
echo ========================================
echo.
echo ❌ "repository does not exist"
echo    → Create the repository on Docker Hub first
echo.
echo ❌ "insufficient_scope: authorization failed"
echo    → Use Access Token, not your password
echo    → Make sure the token has write permissions
echo.
echo ❌ "push access denied"
echo    → Check if you own the repository
echo    → Verify your username is correct
echo.
echo ========================================
echo Quick Fix Commands:
echo ========================================
echo.
echo # Test Docker login locally:
echo docker login
echo.
echo # Test building without pushing:
echo docker build -t test-image .
echo.
echo # Test pushing to your repository:
echo docker tag test-image yujin001/docker-test-project:test
echo docker push yujin001/docker-test-project:test
echo.
echo ========================================
pause
