# CI/CD Deployment Checklist

Use this checklist to deploy your Park INC backend to Heroku with GitHub Actions.

## ✅ Pre-Deployment Checklist

### 1. Heroku Account Setup
- [ ] Create a Heroku account at https://heroku.com
- [ ] Verify your email address
- [ ] Add payment method (required for Eco dynos - $5/month minimum)

### 2. Create Heroku Application
- [ ] Login to Heroku Dashboard
- [ ] Click "New" → "Create new app"
- [ ] Choose an app name (e.g., `park-inc-backend`)
- [ ] Select your preferred region
- [ ] Click "Create app"

**App Name**: ___________________ (write it down, you'll need it!)

### 3. Get Heroku API Key
- [ ] Go to https://dashboard.heroku.com/account
- [ ] Scroll to "API Key" section
- [ ] Click "Reveal" to see your API key
- [ ] Copy the API key (keep it secure!)

### 4. Configure GitHub Secrets
Go to your GitHub repository:
- [ ] Navigate to: Settings → Secrets and variables → Actions
- [ ] Click "New repository secret" and add:

| Secret Name | Value | Status |
|------------|-------|--------|
| `HEROKU_API_KEY` | Your Heroku API key | [ ] Added |
| `HEROKU_APP_NAME` | Your Heroku app name | [ ] Added |
| `HEROKU_EMAIL` | Your Heroku email | [ ] Added |

### 5. Verify Files Are Present
- [ ] `.github/workflows/deploy-backend.yml` exists
- [ ] `backend/Procfile` exists
- [ ] `backend/package.json` has correct dependencies

## 🚀 Deployment Checklist

### 6. Initial Deployment
- [ ] Commit all changes
- [ ] Push to main branch: `git push origin main`
- [ ] Go to GitHub → Actions tab
- [ ] Watch "Deploy Backend to Heroku" workflow
- [ ] Wait for green checkmark (deployment success)

### 7. Verify Deployment
Test these URLs (replace `your-app-name` with your actual app name):

- [ ] Health check: `https://your-app-name.herokuapp.com/api/health`
- [ ] Get parking data: `https://your-app-name.herokuapp.com/api/parking`
- [ ] Get specific spot: `https://your-app-name.herokuapp.com/api/parking/1`

**Test Commands:**
```bash
# Health check
curl https://your-app-name.herokuapp.com/api/health

# Get all parking
curl https://your-app-name.herokuapp.com/api/parking
```

### 8. Configure Heroku Environment Variables (Optional)
- [ ] Go to Heroku Dashboard → Your App → Settings → Config Vars
- [ ] Add: `NODE_ENV` = `production`
- [ ] Add any other required variables

### 9. Monitor Your Application
- [ ] View logs: `heroku logs --tail --app your-app-name`
- [ ] Check Heroku metrics in dashboard
- [ ] Set up monitoring/alerts (optional)

## 🔄 Ongoing Deployment Checklist

### Making Changes
- [ ] Make code changes in `backend/` directory
- [ ] Test locally: `cd backend && npm start`
- [ ] Commit changes: `git commit -am "Description"`
- [ ] Push to main: `git push origin main`
- [ ] Watch GitHub Actions for automatic deployment
- [ ] Verify deployment works

### Troubleshooting
- [ ] Check GitHub Actions logs for errors
- [ ] Check Heroku logs: `heroku logs --tail --app your-app-name`
- [ ] Restart if needed: `heroku restart --app your-app-name`

## 📱 Frontend Configuration

### 10. Update Frontend to Use Production Backend
- [ ] Open `frontend/.env` or create it
- [ ] Set: `VITE_API_URL=https://your-app-name.herokuapp.com/api`
- [ ] Rebuild frontend: `cd frontend && npm run build`
- [ ] Deploy frontend (Netlify, Vercel, etc.)
- [ ] Test end-to-end functionality

## 🔒 Security Checklist

- [ ] Never commit `.env` files with secrets
- [ ] All secrets stored in GitHub Secrets
- [ ] CORS configured for production domain
- [ ] HTTPS enabled (automatic on Heroku)
- [ ] Environment variables set correctly

## 📊 Success Criteria

Your deployment is successful when:
- [ ] GitHub Actions workflow completes without errors
- [ ] Health check endpoint returns `{"status": "ok"}`
- [ ] All API endpoints respond correctly
- [ ] Frontend can connect to backend API
- [ ] No errors in Heroku logs

## 🎉 Post-Deployment

- [ ] Update README with production URL
- [ ] Share API URL with team
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up staging environment (optional)

## 📞 Getting Help

If you encounter issues:

1. **Deployment fails**: Check GitHub Actions logs
2. **App crashes**: Check Heroku logs with `heroku logs --tail`
3. **Can't connect**: Verify URL and CORS settings
4. **Need help**: Open an issue on GitHub

## 🔗 Useful Links

- GitHub Actions: https://github.com/Niang-04/IND8137A/actions
- Heroku Dashboard: https://dashboard.heroku.com/apps/your-app-name
- Heroku Logs: `heroku logs --tail --app your-app-name`

---

**Next Steps After Deployment:**
1. Monitor your first few deployments
2. Set up frontend deployment
3. Configure custom domain (optional)
4. Set up database (for future enhancements)
5. Implement monitoring and alerts

**Estimated Time**: 15-30 minutes for initial setup

**Cost**: Starting at $5/month (Heroku Eco dyno)
