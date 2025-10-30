import { useEffect, useState, Fragment } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Rectangle } from 'react-leaflet';
import { parkingAPI } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Constants for parking space visualization
const PARKING_SPACE_SIZE = 0.00008; // Size of parking space rectangle in degrees

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
  const { t } = useLanguage();

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
        setSimulationStatus(t('map.simulation.success'));
        // Fetch updated data immediately
        await fetchParkingData();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSimulationStatus('');
        }, 3000);
      }
    } catch (err) {
      setSimulationStatus(t('map.simulation.error'));
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
        <p>{t('map.loading')}</p>
      </div>
    );
  }

  return (
    <div className="map-view">
      <div className="map-controls">
        <div className="control-panel">
          <h2>{t('map.title')}</h2>
          
          <div className="filters">
            <div className="filter-group">
              <label>{t('map.filterType')}</label>
              <div className="filter-buttons">
                <button 
                  className={filter === 'all' ? 'active' : ''}
                  onClick={() => setFilter('all')}
                >
                  {t('map.all')}
                </button>
                <button 
                  className={filter === 'public' ? 'active' : ''}
                  onClick={() => setFilter('public')}
                >
                  {t('map.public')}
                </button>
                <button 
                  className={filter === 'private' ? 'active' : ''}
                  onClick={() => setFilter('private')}
                >
                  {t('map.private')}
                </button>
              </div>
            </div>

            <div className="filter-group">
              <label>{t('map.filterArea')}</label>
              <select 
                value={selectedArea} 
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                {areas.map(area => (
                  <option key={area} value={area}>
                    {area === 'all' ? t('map.allAreas') : area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="simulation-section">
            <h3>{t('map.simulation.title')}</h3>
            <p>{t('map.simulation.description')}</p>
            <button 
              className="simulate-button"
              onClick={handleSimulateSensor}
              disabled={isSimulating}
            >
              {isSimulating ? t('map.simulation.simulating') : t('map.simulation.button')}
            </button>
            {simulationStatus && (
              <div className={`simulation-status ${simulationStatus.includes('✅') ? 'success' : simulationStatus.includes('❌') ? 'error' : ''}`}>
                {simulationStatus}
              </div>
            )}
          </div>

          <div className="legend">
            <h3>{t('map.legend.title')}</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
                <span>{t('map.legend.low')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                <span>{t('map.legend.medium')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
                <span>{t('map.legend.high')}</span>
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">{t('map.stats.totalSpots')}</span>
              <span className="stat-value">{filteredSpots.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t('map.stats.available')}</span>
              <span className="stat-value">
                {filteredSpots.reduce((sum, spot) => sum + spot.available, 0)}
              </span>
            </div>
            {lastUpdate && (
              <div className="stat-item">
                <span className="stat-label">{t('map.stats.lastUpdate')}</span>
                <span className="stat-value">{lastUpdate.toLocaleTimeString()}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              {t('map.error')}
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
                <Fragment key={`detailed-${spot.id}`}>
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
                          <p><strong>{t('map.popup.type')}</strong> {spot.type === 'public' ? t('map.public') : t('map.private')}</p>
                          <p><strong>{t('map.popup.area')}</strong> {spot.area}</p>
                          <p><strong>{t('map.popup.available')}</strong> {spot.available} / {spot.total}</p>
                          <p><strong>{t('map.popup.detailedView')}</strong> {t('map.popup.individualSpaces')}</p>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                  
                  {/* Individual parking spaces */}
                  {spot.spaces.map(space => (
                    <Rectangle
                      key={`space-${spot.id}-${space.id}`}
                      bounds={[
                        [space.lat - PARKING_SPACE_SIZE, space.lng - PARKING_SPACE_SIZE],
                        [space.lat + PARKING_SPACE_SIZE, space.lng + PARKING_SPACE_SIZE]
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
                          <h3>{t('map.popup.spaceNumber')}{space.id}</h3>
                          <p><strong>{t('map.popup.status')}</strong> {space.occupied ? t('map.popup.occupied') : t('map.popup.availableStatus')}</p>
                          <p><strong>{t('map.popup.location')}</strong> {spot.name}</p>
                        </div>
                      </Popup>
                    </Rectangle>
                  ))}
                </Fragment>
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
                    <p><strong>{t('map.popup.type')}</strong> {spot.type === 'public' ? t('map.public') : t('map.private')}</p>
                    <p><strong>{t('map.popup.area')}</strong> {spot.area}</p>
                    <p><strong>{t('map.popup.available')}</strong> {spot.available} / {spot.total}</p>
                    <p><strong>{t('map.popup.occupancy')}</strong> {getOccupancyPercentage(spot).toFixed(0)}%</p>
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
