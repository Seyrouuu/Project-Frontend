import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="student-navbar">
      <div className="student-content">
        <div className="navbar-container">
          {/* Brand */}
          <Link className="student-navbar-brand" to="/">
            🎓 Gestion Étudiants
          </Link>
          
          {/* Navigation Links */}
          <div className="student-navbar-nav">
            <Link 
              className={`student-nav-link ${isActive('/students')}`} 
              to="/students"
            >
              📊 Étudiants
            </Link>
            <Link 
              className={`student-nav-link ${isActive('/students/search')}`} 
              to="/students/search"
            >
              🔍 Recherche
            </Link>
            <Link 
              className={`student-nav-link ${isActive('/universities')}`} 
              to="/universities"
            >
              🏛️ Universités
            </Link>
          </div>

          {/* System Info */}
          <div className="navbar-system-info">
            <small className="system-text">
              Système de Gestion Académique
            </small>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;