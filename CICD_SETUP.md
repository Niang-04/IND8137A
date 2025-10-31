# CI/CD Setup Guide for Park INC Backend

This guide explains how to set up continuous deployment for the Park INC backend using GitHub Actions and Heroku.

## Overview

The backend is automatically deployed to Heroku when changes are pushed to the `main` branch. The deployment is handled by GitHub Actions workflow defined in `.github/workflows/deploy-backend.yml`.

## Prerequisites

1. **Heroku Account**: Sign up at [https://heroku.com](https://heroku.com)
2. **Heroku CLI** (optional, for local testing): Install from [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **GitHub Repository**: Your code should be in a GitHub repository

## Initial Setup

### Step 1: Create a Heroku Application

1. Log in to your Heroku account
2. Create a new app:
   - Click "New" → "Create new app"
   - Choose an app name (e.g., `park-inc-backend`)
   - Select a region (United States or Europe)
   - Click "Create app"

Alternatively, using Heroku CLI:
```bash
heroku create park-inc-backend
```

### Step 2: Get Heroku API Key

1. Go to [Account Settings](https://dashboard.heroku.com/account)
2. Scroll down to "API Key"
3. Click "Reveal" and copy the API key

### Step 3: Configure GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `HEROKU_API_KEY` | Your Heroku API key from Step 2 | `12345678-abcd-1234-abcd-123456789abc` |
| `HEROKU_APP_NAME` | Your Heroku app name | `park-inc-backend` |
| `HEROKU_EMAIL` | Email associated with your Heroku account | `your-email@example.com` |

### Step 4: Configure Environment Variables on Heroku

Set any required environment variables for your backend:

Using Heroku Dashboard:
1. Go to your app on Heroku Dashboard
2. Navigate to **Settings** → **Config Vars**
3. Add the following variables:

```
NODE_ENV=production
PORT=5000
```

Using Heroku CLI:
```bash
heroku config:set NODE_ENV=production --app park-inc-backend
```

## How It Works

### Automatic Deployment

The GitHub Actions workflow is triggered when:
- Changes are pushed to the `main` branch in the `backend/` directory
- The workflow file itself is modified
- Manual trigger via GitHub Actions UI (workflow_dispatch)

### Deployment Process

1. **Checkout Code**: Downloads the repository code
2. **Setup Node.js**: Installs Node.js 18 with npm caching
3. **Install Dependencies**: Runs `npm ci` to install packages
4. **Run Tests**: Executes tests if available (optional)
5. **Deploy to Heroku**: Deploys the backend to Heroku
6. **Health Check**: Verifies the deployment by checking the `/api/health` endpoint
7. **Rollback**: Automatically rolls back if health check fails

### Health Check

The workflow includes a health check that verifies:
- The application started successfully
- The `/api/health` endpoint responds with status 200
- If the check fails, the deployment is automatically rolled back

## Manual Deployment

You can also manually trigger a deployment:

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **Deploy Backend to Heroku** workflow
4. Click **Run workflow** → **Run workflow**

## Monitoring Deployment

### View Deployment Status

1. Go to your GitHub repository
2. Navigate to the **Actions** tab
3. Click on the latest workflow run to see detailed logs

### View Application Logs on Heroku

Using Heroku Dashboard:
1. Go to your app on Heroku
2. Click **More** → **View logs**

Using Heroku CLI:
```bash
heroku logs --tail --app park-inc-backend
```

## Testing the Deployment

After deployment, test your backend API:

```bash
# Health check
curl https://park-inc-backend.herokuapp.com/api/health

# Get all parking data
curl https://park-inc-backend.herokuapp.com/api/parking

# Get specific parking spot
curl https://park-inc-backend.herokuapp.com/api/parking/1
```

## Updating Frontend Configuration

After deploying the backend, update your frontend to use the production API:

1. Update `frontend/.env` or your frontend configuration:
```
VITE_API_URL=https://park-inc-backend.herokuapp.com/api
```

2. Redeploy your frontend

## Troubleshooting

### Deployment Fails

**Check the logs:**
```bash
heroku logs --tail --app park-inc-backend
```

**Common issues:**
- Missing environment variables
- Package installation failures
- Port binding issues (ensure you use `process.env.PORT`)

### Application Crashes

**Check Heroku logs:**
```bash
heroku logs --tail --app park-inc-backend
```

**Restart the application:**
```bash
heroku restart --app park-inc-backend
```

### Deployment Stuck

**Check workflow status:**
- Go to GitHub Actions tab
- Check for error messages in the workflow logs

**Manually restart:**
- Cancel the workflow run
- Trigger a new deployment manually

## Advanced Configuration

### Custom Build Scripts

To add custom build steps, modify `backend/package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "heroku-postbuild": "echo 'Custom post-build script'"
  }
}
```

### Environment-Specific Configuration

For different environments (staging, production):

1. Create separate Heroku apps
2. Create additional GitHub secrets
3. Modify the workflow to deploy to different apps based on branches

Example:
```yaml
- name: Deploy to Staging
  if: github.ref == 'refs/heads/develop'
  uses: akhileshns/heroku-deploy@v3.13.15
  with:
    heroku_app_name: park-inc-backend-staging
    # ... other config
```

### Database Integration

When adding a database (e.g., PostgreSQL):

1. Add Heroku Postgres add-on:
```bash
heroku addons:create heroku-postgresql:mini --app park-inc-backend
```

2. The `DATABASE_URL` environment variable is automatically set

3. Update your backend code to use the database URL

## Alternative Deployment Options

If you prefer not to use Heroku, you can modify the workflow for other platforms:

### Render.com

Replace the deploy step with:
```yaml
- name: Deploy to Render
  run: |
    curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}"
```

### Railway.app

```yaml
- name: Deploy to Railway
  uses: bervProject/railway-deploy@main
  with:
    railway_token: ${{ secrets.RAILWAY_TOKEN }}
    service: ${{ secrets.RAILWAY_SERVICE }}
```

### DigitalOcean App Platform

```yaml
- name: Deploy to DigitalOcean
  uses: digitalocean/app_action@main
  with:
    app_name: park-inc-backend
    token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
```

## Cost Considerations

### Heroku Free Tier (Discontinued)

Heroku no longer offers a free tier. Minimum costs:
- **Eco Dynos**: $5/month (sleeps after 30 minutes of inactivity)
- **Basic Dynos**: $7/month (never sleeps)
- **Standard Dynos**: Starting at $25/month

### Alternative Free Options

- **Render.com**: Free tier available (sleeps after inactivity)
- **Railway.app**: $5 free credit per month
- **Fly.io**: Generous free tier
- **Cyclic.sh**: Free tier for small apps

## Security Best Practices

1. **Never commit secrets** to the repository
2. **Use GitHub Secrets** for sensitive data
3. **Rotate API keys** regularly
4. **Enable 2FA** on Heroku and GitHub
5. **Review logs** for suspicious activity
6. **Keep dependencies updated**: Run `npm audit` regularly

## Maintenance

### Regular Updates

Keep your dependencies up to date:
```bash
npm update
npm audit fix
```

### Monitoring

Set up monitoring and alerts:
- Heroku Metrics (included in paid plans)
- Third-party services (New Relic, Datadog)
- GitHub Actions notifications

## Support

For issues related to:
- **Deployment workflow**: Check GitHub Actions logs
- **Heroku platform**: See [Heroku Dev Center](https://devcenter.heroku.com)
- **Application errors**: Check Heroku logs

## Next Steps

1. ✅ Set up the deployment workflow (you're here!)
2. Configure CORS for production domains
3. Set up monitoring and logging
4. Configure custom domain (optional)
5. Set up staging environment (optional)
6. Implement rate limiting for API
7. Add authentication/authorization

---

**Note**: This setup provides a production-ready CI/CD pipeline for your Park INC backend. For production use, consider implementing additional security measures, monitoring, and backup strategies.
