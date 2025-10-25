import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MapView from './pages/MapView';
import MyAccount from './pages/MyAccount';
import './App.css';

function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚗 Park INC
        </Link>
        
        <button 
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              🗺️ Map
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/account" 
              className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              👤 My Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MapView />} />
            <Route path="/account" element={<MyAccount />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
