# Docker Hub Troubleshooting Guide 🐳

## 🚨 Current Issue
Your CI/CD pipeline failed with this error:
```
ERROR: failed to push docker.io/yujin001/docker-test-project:main: push access denied, repository does not exist or may require authorization: server message: insufficient_scope: authorization failed
```

## 🔍 Root Causes & Solutions

### 1. **Repository Doesn't Exist** ❌
**Problem**: The Docker Hub repository `yujin001/docker-test-project` hasn't been created yet.

**Solution**:
1. Go to [hub.docker.com](https://hub.docker.com/)
2. Sign in with your account (`yujin001`)
3. Click "Create Repository"
4. Repository name: `docker-test-project`
5. Choose Public or Private
6. Click "Create"

### 2. **Wrong Credentials** ❌
**Problem**: Using password instead of access token, or wrong username.

**Solution**:
1. Go to [Docker Hub Security Settings](https://hub.docker.com/settings/security)
2. Create new Access Token (not your password!)
3. Give it a name like "GitHub Actions CI/CD"
4. Copy the token
5. Update GitHub Secrets:
   - `DOCKER_USERNAME`: `yujin001`
   - `DOCKER_PASSWORD`: `[your access token]`

### 3. **Insufficient Permissions** ❌
**Problem**: Access token doesn't have write permissions.

**Solution**:
1. Ensure the access token has "Read & Write" permissions
2. Verify you own the repository
3. Check if the repository is private and requires special access

## 🛠️ Quick Fix Steps

### Step 1: Create Docker Hub Repository
```bash
# Go to https://hub.docker.com/
# Create repository: yujin001/docker-test-project
```

### Step 2: Generate Access Token
```bash
# Go to https://hub.docker.com/settings/security
# Create new Access Token
# Copy the token (not your password!)
```

### Step 3: Update GitHub Secrets
```bash
# Go to your GitHub repository
# Settings > Secrets and variables > Actions
# Update:
#   DOCKER_USERNAME: yujin001
#   DOCKER_PASSWORD: [your access token]
```

### Step 4: Test Locally
```bash
# Test Docker login
docker login
# Username: yujin001
# Password: [your access token]

# Test building
docker build -t test-image .

# Test pushing
docker tag test-image yujin001/docker-test-project:test
docker push yujin001/docker-test-project:test
```

## 🔧 Alternative Solutions

### Option 1: Use Different Repository Name
If you want to use a different name, update the workflow:

```yaml
env:
  REGISTRY: docker.io
  IMAGE_NAME: your-username/your-repo-name
```

### Option 2: Use GitHub Container Registry
Instead of Docker Hub, use GitHub's built-in container registry:

```yaml
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
```

Then use `GITHUB_TOKEN` instead of Docker Hub secrets.

### Option 3: Skip Docker Push (Development Only)
For development/testing, you can temporarily disable Docker pushing:

```yaml
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false  # Change to false
          tags: ${{ steps.meta.outputs.tags }}
```

## 🧪 Testing Commands

### Test Docker Build Locally
```bash
# Build without pushing
docker build -t test-image .

# Run the container
docker run --rm -p 9000:9000 test-image

# Test the application
curl http://localhost:9000/health
```

### Test Docker Push Locally
```bash
# Login to Docker Hub
docker login

# Tag and push
docker tag test-image yujin001/docker-test-project:test
docker push yujin001/docker-test-project:test

# Verify
docker pull yujin001/docker-test-project:test
```

## 📋 Verification Checklist

- [ ] Docker Hub repository exists: `yujin001/docker-test-project`
- [ ] Access token created (not password)
- [ ] GitHub secrets updated:
  - [ ] `DOCKER_USERNAME`: `yujin001`
  - [ ] `DOCKER_PASSWORD`: `[access token]`
- [ ] Local Docker build works: `docker build -t test .`
- [ ] Local Docker push works: `docker push yujin001/docker-test-project:test`
- [ ] GitHub Actions workflow updated
- [ ] Changes committed and pushed

## 🚀 After Fixing

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Fix Docker Hub configuration and add troubleshooting"
   git push origin main
   ```

2. **Monitor the workflow**:
   - Go to Actions tab in GitHub
   - Watch the CI/CD pipeline run
   - Check for any new errors

3. **Verify success**:
   - Docker image should be built and pushed
   - Check Docker Hub for your new image
   - Deployment steps should complete

## 📚 Additional Resources

- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [GitHub Actions Docker Guide](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images)
- [Docker Build Push Action](https://github.com/docker/build-push-action)

---

## 🎯 Summary

The main issue is likely that the Docker Hub repository doesn't exist yet. Follow these steps:

1. **Create the repository** on Docker Hub
2. **Generate an access token** (not your password)
3. **Update GitHub secrets** with the correct credentials
4. **Test locally** to ensure everything works
5. **Push changes** to trigger the fixed pipeline

Once these steps are completed, your CI/CD pipeline should successfully build and push Docker images! 🚀
