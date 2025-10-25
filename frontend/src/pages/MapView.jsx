import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Rectangle } from 'react-leaflet';
import { parkingAPI } from '../services/api';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Component to update map view
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function MapView() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, public, private
  const [selectedArea, setSelectedArea] = useState('all');
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [simulationStatus, setSimulationStatus] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  // Montreal coordinates
  const montrealCenter = [45.5017, -73.5673];

  // Fetch parking data
  const fetchParkingData = async () => {
    try {
      const result = await parkingAPI.getAllParkingSpots();
      if (result.success) {
        setParkingSpots(result.data);
        setLastUpdate(new Date(result.timestamp));
        setError(null);
      }
    } catch (err) {
      setError('Failed to load parking data. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingData();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchParkingData, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter parking spots
  const filteredSpots = parkingSpots.filter(spot => {
    const typeMatch = filter === 'all' || spot.type === filter;
    const areaMatch = selectedArea === 'all' || spot.area === selectedArea;
    return typeMatch && areaMatch;
  });

  // Get unique areas
  const areas = ['all', ...new Set(parkingSpots.map(spot => spot.area))];

  // Calculate occupancy percentage
  const getOccupancyPercentage = (spot) => {
    return ((spot.total - spot.available) / spot.total) * 100;
  };

  // Get color based on availability
  const getColor = (spot) => {
    const occupancy = getOccupancyPercentage(spot);
    if (occupancy < 50) return '#10b981'; // Green - low occupancy
    if (occupancy < 80) return '#f59e0b'; // Orange - medium occupancy
    return '#ef4444'; // Red - high occupancy
  };

  // Handle sensor simulation
  const handleSimulateSensor = async () => {
    setIsSimulating(true);
    setSimulationStatus('Simulating sensor data...');
    
    try {
      // Find the detailed parking spot (ID 17 - Ruelle 3520 Édouard-Montpetit)
      const result = await parkingAPI.simulateSensor(17);
      
      if (result.success) {
        setSimulationStatus('✅ Sensor data updated successfully!');
        // Fetch updated data immediately
        await fetchParkingData();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSimulationStatus('');
        }, 3000);
      }
    } catch (err) {
      setSimulationStatus('❌ Failed to simulate sensor data');
      console.error(err);
      
      setTimeout(() => {
        setSimulationStatus('');
      }, 3000);
    } finally {
      setIsSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <p>Loading parking data...</p>
      </div>
    );
  }

  return (
    <div className="map-view">
      <div className="map-controls">
        <div className="control-panel">
          <h2>🚗 Montreal Parking Availability</h2>
          
          <div className="filters">
            <div className="filter-group">
              <label>Type:</label>
              <div className="filter-buttons">
                <button 
                  className={filter === 'all' ? 'active' : ''}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={filter === 'public' ? 'active' : ''}
                  onClick={() => setFilter('public')}
                >
                  🅿️ Public
                </button>
                <button 
                  className={filter === 'private' ? 'active' : ''}
                  onClick={() => setFilter('private')}
                >
                  🏢 Private
                </button>
              </div>
            </div>

            <div className="filter-group">
              <label>Area:</label>
              <select 
                value={selectedArea} 
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                {areas.map(area => (
                  <option key={area} value={area}>
                    {area === 'all' ? 'All Areas' : area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="simulation-section">
            <h3>🎯 Sensor Simulation</h3>
            <p>Simulate real-time sensor data for the alley at 3520 Boulevard Édouard-Montpetit</p>
            <button 
              className="simulate-button"
              onClick={handleSimulateSensor}
              disabled={isSimulating}
            >
              {isSimulating ? '⏳ Simulating...' : '🔄 Simulate Sensor Data'}
            </button>
            {simulationStatus && (
              <div className={`simulation-status ${simulationStatus.includes('✅') ? 'success' : simulationStatus.includes('❌') ? 'error' : ''}`}>
                {simulationStatus}
              </div>
            )}
          </div>

          <div className="legend">
            <h3>Legend:</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
                <span>Low Occupancy (&lt;50%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                <span>Medium Occupancy (50-80%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
                <span>High Occupancy (&gt;80%)</span>
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Spots:</span>
              <span className="stat-value">{filteredSpots.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Available:</span>
              <span className="stat-value">
                {filteredSpots.reduce((sum, spot) => sum + spot.available, 0)}
              </span>
            </div>
            {lastUpdate && (
              <div className="stat-item">
                <span className="stat-label">Last Update:</span>
                <span className="stat-value">{lastUpdate.toLocaleTimeString()}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>

      <div className="map-container">
        <MapContainer 
          center={montrealCenter} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredSpots.map(spot => {
            // Render detailed parking spaces for the alley
            if (spot.detailedView && spot.spaces) {
              return (
                <div key={`detailed-${spot.id}`}>
                  {/* Main marker for the alley */}
                  <CircleMarker
                    center={[spot.lat, spot.lng]}
                    radius={20}
                    fillColor="#667eea"
                    color="white"
                    weight={3}
                    opacity={1}
                    fillOpacity={0.7}
                  >
                    <Popup>
                      <div className="popup-content">
                        <h3>{spot.name}</h3>
                        <div className="popup-details">
                          <p><strong>Type:</strong> {spot.type === 'public' ? '🅿️ Public' : '🏢 Private'}</p>
                          <p><strong>Area:</strong> {spot.area}</p>
                          <p><strong>Available:</strong> {spot.available} / {spot.total}</p>
                          <p><strong>Detailed View:</strong> Individual spaces shown below</p>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                  
                  {/* Individual parking spaces */}
                  {spot.spaces.map(space => {
                    const spaceSize = 0.00008; // Size of parking space rectangle
                    return (
                      <Rectangle
                        key={`space-${spot.id}-${space.id}`}
                        bounds={[
                          [space.lat - spaceSize, space.lng - spaceSize],
                          [space.lat + spaceSize, space.lng + spaceSize]
                        ]}
                        pathOptions={{
                          color: space.occupied ? '#ef4444' : '#10b981',
                          fillColor: space.occupied ? '#ef4444' : '#10b981',
                          fillOpacity: 0.8,
                          weight: 2
                        }}
                      >
                        <Popup>
                          <div className="popup-content">
                            <h3>Space #{space.id}</h3>
                            <p><strong>Status:</strong> {space.occupied ? '🔴 Occupied' : '🟢 Available'}</p>
                            <p><strong>Location:</strong> {spot.name}</p>
                          </div>
                        </Popup>
                      </Rectangle>
                    );
                  })}
                </div>
              );
            } else {
              // Regular circle marker for standard parking spots
              return (
                <CircleMarker
                  key={spot.id}
                  center={[spot.lat, spot.lng]}
                  radius={15}
              fillColor={getColor(spot)}
              color="white"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{spot.name}</h3>
                  <div className="popup-details">
                    <p><strong>Type:</strong> {spot.type === 'public' ? '🅿️ Public' : '🏢 Private'}</p>
                    <p><strong>Area:</strong> {spot.area}</p>
                    <p><strong>Available:</strong> {spot.available} / {spot.total}</p>
                    <p><strong>Occupancy:</strong> {getOccupancyPercentage(spot).toFixed(0)}%</p>
                  </div>
                  <div className="availability-bar">
                    <div 
                      className="availability-fill"
                      style={{ 
                        width: `${(spot.available / spot.total) * 100}%`,
                        backgroundColor: getColor(spot)
                      }}
                    ></div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
              );
            }
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
