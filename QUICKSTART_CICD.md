# Quick Start - CI/CD Deployment

## 🚀 Quick Setup (5 minutes)

### 1. Create Heroku App
```bash
# Login to Heroku
heroku login

# Create app (replace 'your-app-name' with your desired name)
heroku create your-app-name
```

### 2. Get Your Heroku API Key
- Go to https://dashboard.heroku.com/account
- Scroll to "API Key" section
- Click "Reveal" and copy the key

### 3. Add GitHub Secrets
Go to: `GitHub Repository → Settings → Secrets and variables → Actions → New repository secret`

Add these 3 secrets:
- `HEROKU_API_KEY`: Your Heroku API key
- `HEROKU_APP_NAME`: Your Heroku app name (e.g., `your-app-name`)
- `HEROKU_EMAIL`: Your Heroku account email

### 4. Push to Main Branch
```bash
git add .
git commit -m "Setup CI/CD deployment"
git push origin main
```

### 5. Watch Deployment
- Go to GitHub Repository → Actions tab
- Watch the "Deploy Backend to Heroku" workflow run

### 6. Test Your API
```bash
# Replace 'your-app-name' with your actual Heroku app name
curl https://your-app-name.herokuapp.com/api/health
curl https://your-app-name.herokuapp.com/api/parking
```

## 📚 Full Documentation
- [Complete CI/CD Setup Guide](CICD_SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)

## 🔧 Troubleshooting

**Workflow fails?**
- Check GitHub Actions logs in the Actions tab
- Verify all 3 secrets are set correctly

**App crashes on Heroku?**
```bash
heroku logs --tail --app your-app-name
```

**Need to restart the app?**
```bash
heroku restart --app your-app-name
```

## 📝 Notes
- Deployment triggers automatically on push to `main` branch (when backend files change)
- You can also trigger deployment manually from GitHub Actions tab
- Health check ensures deployment is successful before completing
