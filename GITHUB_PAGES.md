# GitHub Pages Deployment

This document explains how the Park INC frontend is deployed to GitHub Pages.

## Automatic Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by a GitHub Actions workflow.

### Workflow

The deployment workflow (`.github/workflows/deploy.yml`) performs the following steps:

1. **Build**: 
   - Checks out the code
   - Sets up Node.js 18
   - Installs dependencies
   - Builds the frontend with Vite

2. **Deploy**:
   - Uploads the build artifacts to GitHub Pages
   - Deploys to the GitHub Pages environment

### Accessing the Site

Once deployed, the site will be available at:
```
https://niang-04.github.io/IND8137A/
```

## Manual Deployment

You can also trigger a manual deployment:

1. Go to the [Actions tab](https://github.com/Niang-04/IND8137A/actions) in the repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch (usually `main`)
5. Click "Run workflow"

## Configuration

### Base Path

The Vite configuration has been set up with the correct base path for GitHub Pages:

```javascript
// frontend/vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/IND8137A/',
})
```

This ensures all assets (CSS, JS, images) are loaded with the correct path.

### Repository Settings

To enable GitHub Pages deployment, ensure the following settings are configured in your repository:

1. Go to **Settings** → **Pages**
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. The workflow will handle the rest

## Backend API

⚠️ **Important**: GitHub Pages only hosts static files. The backend API is not deployed with this setup.

For the full application to work, you need to:

1. Deploy the backend separately (e.g., Heroku, Render, Railway, Fly.io)
2. Update the frontend environment variable to point to the deployed backend:
   ```bash
   VITE_API_URL=https://your-backend-url.com/api
   ```

Alternatively, for demonstration purposes, you can:
- Use mock data in the frontend
- Run the backend locally for development
- Use a CORS proxy for testing

## Local Testing

To test the production build locally:

```bash
cd frontend
npm install
npm run build
npm run preview
```

The preview server will serve the built files, allowing you to test the production build before deployment.

## Troubleshooting

### Build Failures

If the GitHub Actions workflow fails:
1. Check the workflow logs in the Actions tab
2. Verify that all dependencies are correctly specified in `package.json`
3. Ensure the build succeeds locally with `npm run build`

### 404 Errors

If you get 404 errors for assets:
1. Verify the `base` path in `vite.config.js` matches your repository name
2. Check that the repository name is `/IND8137A/`

### API Errors

If the frontend loads but API calls fail:
1. Deploy the backend to a hosting service
2. Update `VITE_API_URL` in the GitHub Actions workflow or create a production `.env` file
3. Ensure CORS is properly configured in the backend to allow requests from the GitHub Pages domain

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
