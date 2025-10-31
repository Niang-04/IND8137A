# Deployment Architecture

## CI/CD Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DEVELOPER                                   │
│                                                                     │
│  1. Makes changes to backend code                                  │
│  2. Commits changes                                                 │
│  3. Pushes to main branch                                           │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      GITHUB REPOSITORY                              │
│                                                                     │
│  • Detects push to main branch                                     │
│  • Triggers GitHub Actions workflow                                 │
│  • Location: .github/workflows/deploy-backend.yml                  │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS WORKFLOW                          │
│                                                                     │
│  Step 1: Checkout Code                                             │
│  ├─ Downloads repository code                                      │
│  │                                                                  │
│  Step 2: Setup Node.js                                             │
│  ├─ Installs Node.js 18                                            │
│  ├─ Configures npm caching                                         │
│  │                                                                  │
│  Step 3: Install Dependencies                                      │
│  ├─ Runs: npm ci                                                   │
│  ├─ Installs packages from package-lock.json                       │
│  │                                                                  │
│  Step 4: Run Tests (Optional)                                      │
│  ├─ Runs: npm test --if-present                                    │
│  │                                                                  │
│  Step 5: Deploy to Heroku                                          │
│  ├─ Uses heroku-deploy action                                      │
│  ├─ Authenticates with HEROKU_API_KEY                              │
│  ├─ Deploys to HEROKU_APP_NAME                                     │
│  ├─ Uses Procfile: "web: node server.js"                           │
│  │                                                                  │
│  Step 6: Health Check                                              │
│  ├─ Checks: /api/health endpoint                                   │
│  ├─ Verifies deployment success                                    │
│  └─ Rolls back if health check fails                               │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        HEROKU PLATFORM                              │
│                                                                     │
│  • Receives deployment from GitHub Actions                         │
│  • Builds application                                              │
│  • Starts web dyno with: node server.js                            │
│  • Exposes on: https://your-app-name.herokuapp.com                 │
│  • Provides logging and monitoring                                  │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    PRODUCTION BACKEND API                           │
│                                                                     │
│  Endpoints available at: https://your-app-name.herokuapp.com/api   │
│  • GET  /api/parking           - All parking spots                 │
│  • GET  /api/parking/:id       - Specific spot                     │
│  • GET  /api/parking/area/:area - Spots by area                    │
│  • GET  /api/parking/type/:type - Spots by type                    │
│  • GET  /api/health            - Health check                      │
│  • POST /api/simulate-sensor   - Simulate sensor data              │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      FRONTEND APPLICATION                           │
│                                                                     │
│  • Connects to backend API                                         │
│  • Displays parking availability on map                            │
│  • Updates every 10 seconds                                        │
└─────────────────────────────────────────────────────────────────────┘
```

## Required GitHub Secrets

```
GitHub Repository
└── Settings
    └── Secrets and variables
        └── Actions
            ├── HEROKU_API_KEY      (Your Heroku API key)
            ├── HEROKU_APP_NAME     (Your Heroku app name)
            └── HEROKU_EMAIL        (Your Heroku account email)
```

## Deployment Trigger Conditions

The workflow is triggered when:

1. **Push to main branch** with changes in:
   - `backend/**` (any file in backend directory)
   - `.github/workflows/deploy-backend.yml` (workflow file itself)

2. **Manual trigger** via GitHub Actions UI:
   - Go to Actions tab
   - Select "Deploy Backend to Heroku"
   - Click "Run workflow"

## File Structure

```
IND8137A/
├── .github/
│   └── workflows/
│       └── deploy-backend.yml          # GitHub Actions workflow
├── backend/
│   ├── Procfile                        # Heroku process file
│   ├── Dockerfile                      # Docker configuration
│   ├── package.json                    # Dependencies and scripts
│   ├── package-lock.json               # Locked dependencies
│   ├── server.js                       # Main server file
│   ├── .env.example                    # Example environment variables
│   └── README.md                       # Backend documentation
├── CICD_SETUP.md                       # Complete CI/CD guide
├── QUICKSTART_CICD.md                  # Quick start guide
├── DEPLOYMENT_CHECKLIST.md             # Step-by-step checklist
└── README.md                           # Project README
```

## Environment Variables Flow

### Development
```
.env file → server.js → process.env.PORT
```

### Production (Heroku)
```
Heroku Config Vars → Dyno Environment → process.env.PORT
```

Set via:
- Heroku Dashboard: Settings → Config Vars
- Heroku CLI: `heroku config:set PORT=5000 --app your-app-name`

## Monitoring and Logs

### GitHub Actions
- View workflow runs: GitHub → Actions tab
- Check deployment status
- Review build logs

### Heroku
- Dashboard: https://dashboard.heroku.com/apps/your-app-name
- CLI: `heroku logs --tail --app your-app-name`
- Metrics: Available in Heroku dashboard

## Rollback Strategy

If deployment fails:

1. **Automatic Rollback**
   - Health check fails → Previous version restored automatically

2. **Manual Rollback**
   ```bash
   heroku releases --app your-app-name
   heroku rollback v42 --app your-app-name
   ```

3. **Git Revert**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Cost Breakdown (Heroku)

| Dyno Type | Cost/Month | Sleeps | Notes |
|-----------|-----------|--------|-------|
| Eco | $5 | After 30 min | Shared resources |
| Basic | $7 | Never | Dedicated resources |
| Standard | $25+ | Never | Better performance |

**Free alternatives:**
- Render.com (Free tier with sleep)
- Railway.app ($5 credit/month)
- Fly.io (Free tier)

## Security Flow

```
GitHub Secrets (Encrypted)
    ↓
GitHub Actions (Secure Runner)
    ↓
Heroku API (HTTPS)
    ↓
Heroku Platform (Secure)
    ↓
Production API (HTTPS)
```

**Security measures:**
- Secrets encrypted in GitHub
- HTTPS enforced on Heroku
- No secrets in code
- Environment variables isolated

## Success Indicators

✅ **Deployment is successful when:**
- GitHub Actions workflow shows green checkmark
- Health check endpoint returns 200 OK
- API endpoints respond correctly
- No errors in Heroku logs
- Frontend can connect to backend

## Troubleshooting Flow

```
Issue Detected
    ↓
Check GitHub Actions logs
    ↓
Check Heroku logs
    ↓
Verify environment variables
    ↓
Test endpoints manually
    ↓
Fix issue
    ↓
Push fix
    ↓
Verify deployment
```

## Next Steps After Setup

1. ✅ Backend deployed
2. Configure frontend to use production API
3. Deploy frontend (Netlify/Vercel)
4. Set up custom domain (optional)
5. Configure monitoring/alerts
6. Set up staging environment
7. Implement authentication
8. Add database integration

---

**Note**: This architecture provides a production-ready CI/CD pipeline with automatic deployments, health checks, and rollback capabilities.
