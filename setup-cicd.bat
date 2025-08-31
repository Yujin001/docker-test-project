@echo off
echo ========================================
echo CI/CD Pipeline Setup Helper
echo ========================================
echo.
echo This script will help you set up your CI/CD pipeline.
echo.
echo 1. First, commit and push these new files:
echo    git add .github/
echo    git commit -m "Add CI/CD pipeline with GitHub Actions"
echo    git push origin main
echo.
echo 2. Set up repository secrets in GitHub:
echo    - Go to your repository on GitHub
echo    - Navigate to Settings > Secrets and variables > Actions
echo    - Add these secrets:
echo      * DOCKER_USERNAME: Your Docker Hub username
echo      * DOCKER_PASSWORD: Your Docker Hub access token
echo.
echo 3. Create environments (optional but recommended):
echo    - Go to Settings > Environments
echo    - Create 'production' and 'staging' environments
echo    - Configure protection rules as needed
echo.
echo 4. Set up branch protection (recommended):
echo    - Go to Settings > Branches
echo    - Add rule for 'main' branch
echo    - Enable "Require status checks to pass before merging"
echo    - Select 'build-and-test' as required
echo.
echo 5. Test the pipeline:
echo    - Create a new branch: git checkout -b test-cicd
echo    - Make a small change and commit
echo    - Push and create a pull request
echo    - Check the Actions tab to see the workflow run
echo.
echo ========================================
echo Setup complete! Check the .github/README.md for detailed information.
echo ========================================
pause
