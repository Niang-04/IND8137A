# Park INC

🚗 **Park INC** is a modern web application that displays real-time parking availability in Montreal on an interactive map. The application shows both private parking lots and public street parking, helping users find available parking spots quickly and efficiently.

## Live Demo

🌐 **[View Live Demo on GitHub Pages](https://niang-04.github.io/IND8137A/)**

## Features

- 🗺️ **Interactive Map**: Real-time parking availability displayed on a Leaflet map
- 🔴🟢 **Visual Indicators**: Color-coded parking spots (green/yellow/red based on occupancy)
- 🅿️ **Public & Private Parking**: Shows both public street parking and private parking lots
- 📍 **Montreal Coverage**: Covers major areas including Downtown, Old Montreal, Plateau, and more
- 📱 **Mobile-Friendly**: Fully responsive design for all devices
- 👤 **User Account**: Personal account page with parking statistics and preferences
- 🔄 **Real-Time Updates**: Automatic data refresh every 10 seconds
- 🎨 **Modern UI**: Clean, intuitive interface with gradient designs

## Technology Stack

### Backend
- **Node.js** & **Express**: RESTful API server
- **CORS**: Cross-origin resource sharing
- Real-time sensor data simulation

### Frontend
- **React**: Component-based UI library
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Leaflet** & **React-Leaflet**: Interactive map visualization
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
Park INC/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (MapView, MyAccount)
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component with routing
│   │   └── main.jsx       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── .env.example       # Environment variables template
└── README.md              # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is occupied)

## Usage

1. **Start the Backend**: Run the backend server first to provide parking data API
2. **Start the Frontend**: Launch the React application
3. **Open Browser**: Navigate to the frontend URL (typically `http://localhost:5173`)
4. **Explore**:
   - View the interactive map with real-time parking availability
   - Filter by parking type (Public/Private)
   - Filter by area (Downtown, Old Montreal, etc.)
   - Click on parking spots for detailed information
   - Navigate to "My Account" to view your profile and statistics

## API Endpoints

### Backend API (Port 5000)

- `GET /api/parking` - Get all parking spots
- `GET /api/parking/:id` - Get specific parking spot
- `GET /api/parking/area/:area` - Get parking spots by area
- `GET /api/parking/type/:type` - Get parking spots by type (public/private)
- `GET /api/health` - API health check

## Features in Detail

### Map View
- Interactive Leaflet map centered on Montreal
- Color-coded markers indicating parking availability:
  - 🟢 Green: Low occupancy (<50%)
  - 🟡 Orange: Medium occupancy (50-80%)
  - 🔴 Red: High occupancy (>80%)
- Real-time updates every 10 seconds
- Filters for parking type and area
- Detailed popups with parking information

### My Account
- Personal information management
- Favorite parking areas
- Parking statistics (sessions, time, spending)
- Recent parking activity
- Edit profile functionality

## Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (>1024px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## Data Simulation

The backend simulates real-time parking sensor data by:
- Providing 16 parking locations across Montreal
- Automatically updating availability every 10 seconds
- Randomly adjusting spot counts to simulate real-world usage

## Future Enhancements

- User authentication and authorization
- Real parking sensor integration
- Payment processing
- Reservation system
- Navigation to parking spots
- Push notifications for availability
- Historical data and analytics
- Multiple city support

## Deployment

### GitHub Pages

The frontend is automatically deployed to GitHub Pages on every push to the `main` branch. See [GITHUB_PAGES.md](GITHUB_PAGES.md) for detailed deployment information.

**Live Demo:** https://niang-04.github.io/IND8137A/

### Full Stack Deployment

For complete deployment instructions including backend hosting options, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contributing

This is an educational project for demonstrating real-time parking availability visualization.

## License

MIT License

---

**Developed with ❤️ for Montreal parking needs**

