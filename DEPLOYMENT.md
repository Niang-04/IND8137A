# Deployment Guide

This guide explains how to deploy Park INC to production.

## Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- A server or hosting platform (e.g., VPS, Heroku, Vercel, Netlify)

## Environment Variables

### Backend (.env in backend/)
```bash
PORT=5000
NODE_ENV=production
```

### Frontend (.env in frontend/)
```bash
VITE_API_URL=https://your-backend-api.com/api
```

## Backend Deployment

> **🚀 CI/CD Deployment**: For automated deployment with GitHub Actions to Heroku, see the [CI/CD Setup Guide](CICD_SETUP.md).

### Option 1: Traditional Server (VPS, EC2, etc.)

1. SSH into your server
2. Clone the repository
3. Navigate to backend folder
4. Install dependencies:
```bash
cd backend
npm install --production
```

5. Start with PM2 (recommended for production):
```bash
npm install -g pm2
pm2 start server.js --name park-inc-backend
pm2 save
pm2 startup
```

### Option 2: Heroku

1. Create a new Heroku app
2. Add a `Procfile` in the backend folder:
```
web: node server.js
```

3. Deploy:
```bash
cd backend
heroku create park-inc-backend
git init
git add .
git commit -m "Deploy backend"
git push heroku main
```

### Option 3: Docker

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t park-inc-backend .
docker run -p 5000:5000 park-inc-backend
```

## Frontend Deployment

### Option 1: Netlify (Recommended)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect your GitHub repo to Netlify for automatic deployments.

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: `frontend`

### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

Or connect your GitHub repo to Vercel.

### Option 3: Traditional Server (Nginx)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Copy the `dist` folder to your server
3. Configure Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Production Checklist

- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Set `NODE_ENV=production` for backend
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline (optional)
- [ ] Test all features in production environment
- [ ] Set up analytics (optional)

## Security Considerations

1. **API Security**
   - Implement rate limiting
   - Add authentication/authorization if needed
   - Use environment variables for sensitive data
   - Keep dependencies updated

2. **CORS Configuration**
   Update `backend/server.js` CORS settings for production:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

3. **HTTPS**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS
   - Use Let's Encrypt for free SSL certificates

## Monitoring

### Backend Monitoring with PM2

```bash
pm2 monit
pm2 logs park-inc-backend
```

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage analytics

## Scaling

### Backend Scaling

- Use PM2 cluster mode:
```bash
pm2 start server.js -i max --name park-inc-backend
```

- Or use a load balancer with multiple instances

### Frontend Scaling

- Use a CDN (Cloudflare, AWS CloudFront)
- Enable caching headers
- Optimize images and assets

## Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Backend
cd backend
npm install
pm2 restart park-inc-backend

# Frontend
cd frontend
npm install
npm run build
# Upload dist folder to your hosting
```

### Database (Future Enhancement)

When you integrate a real database:
- Set up regular backups
- Use database connection pooling
- Implement database migrations
- Monitor database performance

## Troubleshooting

### Backend Issues
- Check logs: `pm2 logs park-inc-backend`
- Verify port 5000 is open
- Check environment variables

### Frontend Issues
- Verify API URL is correct
- Check browser console for errors
- Ensure CORS is properly configured
- Check network tab for failed requests

## Support

For deployment issues, please open an issue on GitHub with:
- Deployment platform used
- Error messages
- Steps to reproduce
