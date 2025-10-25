const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated parking data for Montreal
// Including both private parking lots and public street parking
let parkingSpots = [
  // Downtown Montreal - Private Parking
  { id: 1, name: "Place Ville Marie Parking", lat: 45.5017, lng: -73.5673, type: "private", total: 50, available: 23, area: "Downtown" },
  { id: 2, name: "Central Station Parking", lat: 45.4958, lng: -73.5656, type: "private", total: 80, available: 45, area: "Downtown" },
  { id: 3, name: "Bell Centre Parking", lat: 45.4961, lng: -73.5693, type: "private", total: 100, available: 78, area: "Downtown" },
  
  // Downtown - Public Street Parking
  { id: 4, name: "Rue Sainte-Catherine", lat: 45.5048, lng: -73.5698, type: "public", total: 30, available: 12, area: "Downtown" },
  { id: 5, name: "Rue Sherbrooke", lat: 45.5088, lng: -73.5710, type: "public", total: 25, available: 8, area: "Downtown" },
  { id: 6, name: "Boulevard René-Lévesque", lat: 45.4990, lng: -73.5700, type: "public", total: 35, available: 20, area: "Downtown" },
  
  // Old Montreal
  { id: 7, name: "Old Port Parking", lat: 45.5086, lng: -73.5541, type: "private", total: 120, available: 67, area: "Old Montreal" },
  { id: 8, name: "Rue Saint-Paul", lat: 45.5066, lng: -73.5547, type: "public", total: 20, available: 5, area: "Old Montreal" },
  { id: 9, name: "Place Jacques-Cartier", lat: 45.5086, lng: -73.5531, type: "public", total: 15, available: 3, area: "Old Montreal" },
  
  // Plateau Mont-Royal
  { id: 10, name: "Mont-Royal Parking", lat: 45.5200, lng: -73.5830, type: "private", total: 60, available: 42, area: "Plateau" },
  { id: 11, name: "Avenue Mont-Royal", lat: 45.5230, lng: -73.5900, type: "public", total: 40, available: 18, area: "Plateau" },
  { id: 12, name: "Rue Saint-Denis", lat: 45.5190, lng: -73.5640, type: "public", total: 35, available: 14, area: "Plateau" },
  
  // Quartier Latin
  { id: 13, name: "UQAM Parking", lat: 45.5140, lng: -73.5635, type: "private", total: 90, available: 55, area: "Quartier Latin" },
  { id: 14, name: "Rue Berri", lat: 45.5170, lng: -73.5625, type: "public", total: 28, available: 11, area: "Quartier Latin" },
  
  // Westmount
  { id: 15, name: "Westmount Square", lat: 45.4875, lng: -73.5892, type: "private", total: 75, available: 50, area: "Westmount" },
  { id: 16, name: "Avenue Greene", lat: 45.4830, lng: -73.5870, type: "public", total: 22, available: 9, area: "Westmount" },
];

// Simulate real-time sensor updates
setInterval(() => {
  parkingSpots = parkingSpots.map(spot => {
    // Randomly change availability (simulate cars coming and going)
    const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
    let newAvailable = spot.available + change;
    
    // Keep within bounds
    newAvailable = Math.max(0, Math.min(spot.total, newAvailable));
    
    return {
      ...spot,
      available: newAvailable
    };
  });
}, 10000); // Update every 10 seconds

// API Routes
app.get('/api/parking', (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: parkingSpots
  });
});

app.get('/api/parking/:id', (req, res) => {
  const spot = parkingSpots.find(s => s.id === parseInt(req.params.id));
  if (spot) {
    res.json({
      success: true,
      data: spot
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Parking spot not found'
    });
  }
});

// Get parking by area
app.get('/api/parking/area/:area', (req, res) => {
  const spots = parkingSpots.filter(s => 
    s.area.toLowerCase() === req.params.area.toLowerCase()
  );
  res.json({
    success: true,
    data: spots
  });
});

// Get parking by type (public/private)
app.get('/api/parking/type/:type', (req, res) => {
  const spots = parkingSpots.filter(s => 
    s.type.toLowerCase() === req.params.type.toLowerCase()
  );
  res.json({
    success: true,
    data: spots
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Park INC API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚗 Park INC Backend running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
});
