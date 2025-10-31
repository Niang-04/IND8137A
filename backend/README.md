# Backend Deployment Files

This directory contains the backend Node.js/Express application for Park INC.

## Deployment Files

### Procfile
The `Procfile` specifies the command that Heroku uses to start your application:
```
web: node server.js
```

This tells Heroku to run `node server.js` as a web dyno.

### Dockerfile
The `Dockerfile` allows you to containerize the backend application for deployment on Docker-based platforms or local development.

Build the Docker image:
```bash
docker build -t park-inc-backend .
```

Run the container:
```bash
docker run -p 5000:5000 park-inc-backend
```

## Environment Variables

The backend uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port the server listens on | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |

## CI/CD Deployment

See the [CI/CD Setup Guide](../CICD_SETUP.md) for automated deployment instructions using GitHub Actions.

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install --production
npm start
```

## API Endpoints

- `GET /api/parking` - Get all parking spots
- `GET /api/parking/:id` - Get specific parking spot
- `GET /api/parking/area/:area` - Get parking spots by area
- `GET /api/parking/type/:type` - Get parking spots by type
- `GET /api/health` - Health check endpoint
- `POST /api/simulate-sensor` - Simulate sensor data (for detailed parking)
