import React, { useState, useEffect } from 'react';
import LoginApp from '../src/loginF-main/App';
import StudentApp from '../src/studentF-main/App';
import CourseApp from '../src/courseF-main/App';
import Chatbot from '../src/chatbotF-main/App';
import './App.css';

function App() {
  const [currentApp, setCurrentApp] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Gérer l'authentification
  const handleLogin = (adminStatus = false) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    setCurrentApp('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentApp('login');
  };

  // Navigation entre les apps
  const navigateTo = (app) => {
    setCurrentApp(app);
  };

  // Vérifier l'URL au chargement
  useEffect(() => {
    const path = window.location.pathname;
    if (isAuthenticated) {
      switch(path) {
        case '/student':
          setCurrentApp('students');
          break;
        case '/cour':
          setCurrentApp('courses');
          break;
        case '/chatbot':
          setCurrentApp('chatbot');
          break;
        case '/admin':
          setCurrentApp('admin');
          break;
        case '/dashboard':
        case '/':
          setCurrentApp('dashboard');
          break;
        default:
          setCurrentApp('dashboard');
      }
    }
  }, [isAuthenticated]);

  // Mettre à jour l'URL quand l'application change
  useEffect(() => {
    if (isAuthenticated) {
      let path = '/';
      switch(currentApp) {
        case 'students':
          path = '/student';
          break;
        case 'courses':
          path = '/cour';
          break;
        case 'chatbot':
          path = '/chatbot';
          break;
        case 'admin':
          path = '/admin';
          break;
        case 'dashboard':
          path = '/dashboard';
          break;
        case 'login':
          path = '/login';
          break;
      }
      window.history.pushState({}, '', path);
    }
  }, [currentApp, isAuthenticated]);

  // Si non authentifié, afficher l'app login
  if (!isAuthenticated) {
    if (window.location.pathname !== '/login') {
      window.history.replaceState({}, '', '/login');
    }
    return <LoginApp onLogin={handleLogin} />;
  }

  // Dashboard principal après authentification
  if (currentApp === 'dashboard') {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Tableau de Bord • Anywhere App</h1>
          <div className="dashboard-controls">
            <button className="nav-btn" onClick={() => navigateTo('students')}>👨‍🎓 Étudiants</button>
            <button className="nav-btn" onClick={() => navigateTo('courses')}>📚 Cours</button>
            <button className="nav-btn" onClick={() => navigateTo('chatbot')}>🤖 Assistant</button>
            {isAdmin && <button className="nav-btn admin" onClick={() => navigateTo('admin')}>⚙️ Admin</button>}
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="welcome-section">
            <h2>Bienvenue dans votre espace de travail</h2>
            <p>Sélectionnez une section pour commencer</p>
            
            <div className="app-grid">
              <div className="app-card" onClick={() => navigateTo('students')}>
                <h3>👨‍🎓 Gestion des Étudiants</h3>
                <p>Gérez les inscriptions et profils étudiants</p>
              </div>
              
              <div className="app-card" onClick={() => navigateTo('courses')}>
                <h3>📚 Gestion des Cours</h3>
                <p>Créez et organisez vos cours</p>
              </div>
              
              <div className="app-card" onClick={() => navigateTo('chatbot')}>
                <h3>🤖 Assistant Virtuel</h3>
                <p>Obtenez de l'aide instantanée</p>
              </div>
              
              {isAdmin && (
                <div className="app-card admin" onClick={() => navigateTo('admin')}>
                  <h3>⚙️ Panel Administrateur</h3>
                  <p>Accédez aux outils d'administration</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Router pour les différentes applications
  switch(currentApp) {
    case 'students':
      return (
        <div className="app-container">
          <header className="app-header">
            <button className="back-btn" onClick={() => navigateTo('dashboard')}>← Retour</button>
            <h2>Gestion des Étudiants</h2>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </header>
          <StudentApp />
        </div>
      );
      
    case 'courses':
      return (
        <div className="app-container">
          <header className="app-header">
            <button className="back-btn" onClick={() => navigateTo('dashboard')}>← Retour</button>
            <h2>Gestion des Cours</h2>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </header>
          <CourseApp />
        </div>
      );
      
    case 'chatbot':
      return (
        <div className="app-container">
          <header className="app-header">
            <button className="back-btn" onClick={() => navigateTo('dashboard')}>← Retour</button>
            <h2>Assistant Virtuel</h2>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </header>
          <Chatbot 
            onBackToDashboard={() => navigateTo('dashboard')}
            onLogout={handleLogout}
          />
        </div>
      );
      
    case 'admin':
      return (
        <div className="app-container">
          <header className="app-header">
            <button className="back-btn" onClick={() => navigateTo('dashboard')}>← Retour</button>
            <h2>Panel Administrateur</h2>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </header>
          <div className="admin-placeholder">
            <h3>Panel Admin</h3>
            <p>Interface d'administration complète</p>
          </div>
        </div>
      );
      
    default:
      return <LoginApp onLogin={handleLogin} />;
  }
}

export default App;