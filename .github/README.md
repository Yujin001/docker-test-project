# CI/CD Pipeline Documentation

This directory contains the GitHub Actions workflow for automated CI/CD pipeline.

## Workflow Overview

The `ci-cd.yml` workflow includes the following jobs:

### 1. Build and Test (`build-and-test`)
- Runs on every push and pull request
- Sets up Node.js 18 environment
- Installs dependencies with `npm ci`
- Runs tests against a PostgreSQL service
- Includes placeholder for linting (ESLint can be added later)

### 2. Docker Build (`docker-build`)
- Runs after successful build and test
- Only triggers on pushes to `main` or `develop` branches
- Builds Docker image using your Dockerfile
- Pushes to Docker Hub with appropriate tags
- Uses GitHub Actions cache for faster builds

### 3. Deploy to Production (`deploy-production`)
- Runs after successful Docker build
- Only triggers on pushes to `main` branch
- Placeholder for production deployment logic
- Protected by `production` environment

### 4. Deploy to Staging (`deploy-staging`)
- Runs after successful Docker build
- Only triggers on pushes to `develop` branch
- Placeholder for staging deployment logic
- Protected by `staging` environment

### 5. Security Scan (`security-scan`)
- Runs Trivy vulnerability scanner
- Uploads results to GitHub Security tab
- Runs on every push

## Setup Instructions

### 1. Repository Secrets
Add these secrets in your GitHub repository (Settings > Secrets and variables > Actions):

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub access token (not your password)

### 2. Environment Protection (Optional)
For production deployments, you can set up environment protection rules:

1. Go to Settings > Environments
2. Create `production` and `staging` environments
3. Add required reviewers or approval rules
4. Add environment-specific secrets if needed

### 3. Branch Protection (Recommended)
Set up branch protection rules for `main`:

1. Go to Settings > Branches
2. Add rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select the `build-and-test` job as required

## Customization

### Adding Linting
1. Install ESLint: `npm install --save-dev eslint`
2. Create `.eslintrc.js` configuration
3. Add `"lint": "eslint src/"` to package.json scripts
4. Uncomment the linting step in the workflow

### Adding Build Step
If your project needs a build step:

1. Add build script to package.json: `"build": "your-build-command"`
2. Uncomment the build step in the workflow
3. Update the Docker build context if needed

### Customizing Deployment
Replace the placeholder deployment steps with your actual deployment logic:

- **AWS**: Use `aws-actions/configure-aws-credentials` and AWS CLI
- **Azure**: Use Microsoft Azure actions
- **Kubernetes**: Use `azure/k8s-deploy` or similar
- **Custom**: Add your deployment scripts or API calls

### Adding More Tests
The workflow includes a PostgreSQL service for database tests. You can:

1. Add more test scripts to package.json
2. Update the test step to run multiple test commands
3. Add coverage reporting with tools like Jest or Istanbul

## Workflow Triggers

- **Push to main**: Triggers full pipeline (build, test, Docker build, production deploy)
- **Push to develop**: Triggers build, test, Docker build, staging deploy
- **Pull Request**: Triggers only build and test (no deployment)
- **Other branches**: No automatic triggers

## Monitoring and Debugging

### Workflow Logs
- View workflow runs in the Actions tab
- Each job shows detailed logs for debugging
- Failed steps are clearly marked with error details

### Common Issues
1. **Docker Hub authentication**: Ensure secrets are correctly set
2. **Test failures**: Check database connection and test environment
3. **Build failures**: Verify Dockerfile syntax and dependencies
4. **Permission issues**: Check repository and environment settings

### Performance Optimization
- The workflow uses GitHub Actions cache for npm dependencies
- Docker builds use Buildx with layer caching
- Consider using self-hosted runners for faster builds if needed

## Security Features

- Vulnerability scanning with Trivy
- Results uploaded to GitHub Security tab
- Environment protection for production deployments
- No hardcoded secrets in workflow files
