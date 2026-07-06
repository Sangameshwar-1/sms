# CI/CD Pipeline Documentation

## Overview

The School Management System uses GitHub Actions for continuous integration (CI) and continuous deployment (CD). The pipeline ensures code quality, runs automated tests, and deploys to GitHub Container Registry (GHCR).

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

Triggered on **every push and pull request** to `main` and `develop` branches.

#### Steps:
- **Lint**: Runs ESLint across the monorepo
- **Type Check**: Validates TypeScript types using `tsc`
- **Build**: Builds frontend and backend production bundles
- **Database Setup**: Initializes Prisma schema and runs migrations
- **E2E Tests**: Runs Playwright tests against local dev servers
- **Artifacts**: Uploads Playwright HTML report

#### Services:
- PostgreSQL 15 (test database)
- Redis 7 (cache layer)

### 2. CD Workflow (`.github/workflows/cd.yml`)

Triggered **only on push to `main` branch** after CI passes.

#### Steps:
- **Build & Push**: Creates Docker images for backend and frontend
- **Push to GHCR**: Pushes images with tags:
  - `latest` (on main branch)
  - `sha-<commit-hash>` (commit-specific tag)
  - Semantic version tags (if release tags are created)

## Local Development & Testing

### Running E2E Tests Locally

1. Start the development stack:
   ```bash
   docker-compose up
   ```

2. Run tests in UI mode (recommended for debugging):
   ```bash
   npm run test:e2e:ui
   ```

3. Run tests in headless mode:
   ```bash
   npm run test:e2e
   ```

4. Run tests with visible browser:
   ```bash
   npm run test:e2e:headed
   ```

### Running Specific Tests

```bash
cd apps/e2e

# Run only authentication tests
npx playwright test auth.spec.ts

# Run only admin dashboard tests
npx playwright test admin-dashboard.spec.ts

# Run with debugging
npm run test:debug
```

## Production Deployment

### Using docker-compose.prod.yml

1. Create `.env.prod` from `.env.example.prod`:
   ```bash
   cp .env.example.prod .env.prod
   ```

2. Fill in secure credentials:
   ```env
   POSTGRES_PASSWORD=your_secure_password
   REDIS_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   BACKEND_IMAGE=ghcr.io/yourorg/sms/backend:latest
   FRONTEND_IMAGE=ghcr.io/yourorg/sms/frontend:latest
   ```

3. Deploy:
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
   ```

## GitHub Secrets Configuration

For the CD workflow to work, configure the following in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**

2. The `GITHUB_TOKEN` is automatically available (used for GHCR authentication)

3. Optional: Add custom secrets for cloud deployment:
   - `AWS_ACCESS_KEY_ID` (if deploying to AWS)
   - `DIGITALOCEAN_TOKEN` (if deploying to DigitalOcean)
   - etc.

## Environment Variables Reference

### Development (`.env`)
```env
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/school_management?schema=public
JWT_SECRET=dev_secret
REDIS_URL=redis://localhost:6379
PORT=5000
```

### Testing (CI Workflow)
```env
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/school_management?schema=public
JWT_SECRET=test_secret_key
REDIS_URL=redis://localhost:6379
PORT=5000
BASE_URL=http://localhost:8080
```

### Production (`.env.prod`)
See `.env.example.prod` for complete list.

## Troubleshooting

### E2E Tests Failing in CI

1. Check the **Playwright Report** artifact in the failed workflow run
2. Look for timeout issues - increase wait times if needed:
   ```typescript
   await page.waitForURL(/.*\/admin/, { timeout: 10000 });
   ```

### Docker Build Failures

1. Ensure Dockerfiles are up to date
2. Check for missing environment variables in CI
3. Verify dependencies are listed in `package.json`

### GHCR Push Failures

1. Verify `GITHUB_TOKEN` has `packages:write` permission
2. Repository name must be lowercase
3. Check if organization/repo path is correct in workflow

## Monitoring & Notifications

### Workflow Status
- GitHub automatically notifies on workflow failures via email
- Check **Actions** tab in your repository for detailed logs

### Container Registry
View pushed images at: `https://github.com/yourusername/sms/pkgs/container`

## Future Enhancements

- [ ] Add code coverage reports (Codecov, Coveralls)
- [ ] Add security scanning (Snyk, Dependabot)
- [ ] Add performance testing
- [ ] Add cloud deployment workflow (AWS, DigitalOcean, etc.)
- [ ] Add Slack notifications for deployment status
