import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MapView from './pages/MapView';
import MyAccount from './pages/MyAccount';
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext';
import './App.css';

function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          {t('nav.logo')}
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
              {t('nav.map')}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/account" 
              className={`nav-link ${location.pathname === '/account' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.account')}
            </Link>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link nav-button"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Mode Nuit / Night Mode' : 'Mode Jour / Day Mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link nav-button"
              onClick={toggleLanguage}
              title={language === 'fr' ? 'Switch to English' : 'Passer au Français'}
            >
              {language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
            </button>
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
