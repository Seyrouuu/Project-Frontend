import React, { useState } from "react";
import StudentApp from '../studentF-main/App';
import CourseApp from '../courseF-main/App';
import ChatbotApp from '../chatbotF-main/App';
import "./App.css";

function App() {

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === "text" ? 
        (e.target.placeholder === "First Name" ? "firstName" : "lastName") : 
        (e.target.type === "email" ? "email" : "password")]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adminCredentials = {
      email: "Bensaid@gmail.com",
      password: "Ys2025",
      firstName: "Youssef",
      lastName: "Bensaid"
    };

    if (
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password &&
      formData.firstName === adminCredentials.firstName &&
      formData.lastName === adminCredentials.lastName
    ) {
      setIsAdmin(true);
    } else {
      alert("Informations de connexion incorrectes");
    }
  };

  // Données simulées
  const usersData = [
    { id: 1, name: "Jean Dupont", email: "jean@email.com", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Marie Martin", email: "marie@email.com", status: "active", joinDate: "2024-02-20" },
    { id: 3, name: "Pierre Lambert", email: "pierre@email.com", status: "inactive", joinDate: "2024-01-08" },
    { id: 4, name: "Sophie Bernard", email: "sophie@email.com", status: "active", joinDate: "2024-03-05" }
  ];

  const studentsData = [
    { id: 1, name: "Alice Dubois", email: "alice@email.com", class: "Master 1", status: "active", enrollmentDate: "2024-01-10" },
    { id: 2, name: "Thomas Moreau", email: "thomas@email.com", class: "Licence 3", status: "active", enrollmentDate: "2024-02-15" },
    { id: 3, name: "Emma Laurent", email: "emma@email.com", class: "Master 2", status: "active", enrollmentDate: "2024-01-20" },
    { id: 4, name: "Lucas Petit", email: "lucas@email.com", class: "Licence 2", status: "inactive", enrollmentDate: "2024-03-01" }
  ];

  const coursesData = [
    { id: 1, title: "Développement Web", instructor: "Dr. Martin", schedule: "Lundi 09:00-11:00", students: 25, capacity: 30, status: "active" },
    { id: 2, title: "Base de Données", instructor: "Prof. Leroy", schedule: "Mardi 14:00-16:00", students: 20, capacity: 25, status: "active" },
    { id: 3, title: "Intelligence Artificielle", instructor: "Dr. Sanchez", schedule: "Jeudi 10:00-12:00", students: 18, capacity: 20, status: "active" },
    { id: 4, title: "Réseaux Informatiques", instructor: "Prof. Dubois", schedule: "Vendredi 16:00-18:00", students: 15, capacity: 20, status: "inactive" }
  ];

  const calendarEvents = [
    { id: 1, title: "Examen Développement Web", date: "2024-03-15", time: "09:00-12:00", type: "exam", course: "Développement Web" },
    { id: 2, title: "Réunion des enseignants", date: "2024-03-18", time: "14:00-16:00", type: "meeting", course: "" },
    { id: 3, title: "TP Base de Données", date: "2024-03-20", time: "14:00-16:00", type: "lab", course: "Base de Données" },
    { id: 4, title: "Conférence IA", date: "2024-03-22", time: "10:00-12:00", type: "conference", course: "Intelligence Artificielle" },
    { id: 5, title: "Rendu de projet", date: "2024-03-25", time: "23:59", type: "deadline", course: "Tous les cours" }
  ];

  const recentActivities = [
    { id: 1, type: "login", user: "Jean Dupont", time: "Il y a 5 min", description: "Connexion utilisateur" },
    { id: 2, type: "update", user: "Marie Martin", time: "Il y a 15 min", description: "Profil mis à jour" },
    { id: 3, type: "payment", user: "Pierre Lambert", time: "Il y a 1 heure", description: "Paiement effectué" },
    { id: 4, type: "support", user: "Sophie Bernard", time: "Il y a 2 heures", description: "Ticket support créé" }
  ];

  // Fonctions pour le calendrier
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const getEventsForDay = (day) => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'exam': return '📝';
      case 'meeting': return '👥';
      case 'lab': return '🔬';
      case 'conference': return '🎤';
      case 'deadline': return '⏰';
      default: return '📅';
    }
  };

  // Fonctions de navigation
  const handleBackToDashboard = () => {
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  };

  // Si l'utilisateur est admin, afficher la page admin
  if (isAdmin) {
    // SI ON EST DANS L'APP ÉTUDIANTS
    if (activeTab === 'students') {
      return (
        <div className="full-app-container">
          <div className="app-header">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Retour au Dashboard
            </button>
            <h1>Application de Gestion des Étudiants</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
          <StudentApp />
        </div>
      );
    }

    // SI ON EST DANS L'APP COURS
    if (activeTab === 'courses') {
      return (
        <div className="full-app-container">
          <div className="app-header">
            <button className="back-btn" onClick={handleBackToDashboard}>
              ← Retour au Dashboard
            </button>
            <h1>Application de Gestion des Cours</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
          <CourseApp />
        </div>
      );
    }

    // SI ON EST DANS L'APP CHATBOT
    if (activeTab === 'chatbot') {
      return (
        <div className="full-app-container">
          <ChatbotApp 
            onBackToDashboard={handleBackToDashboard}
            onLogout={handleLogout}
          />
        </div>
      );
    }

    // SINON, AFFICHER LE DASHBOARD ADMIN NORMAL
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h1>Panel Administrateur • Anywhere App</h1>
          <div>
            <button 
              className="logout-btn"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
        </div>
        
        {/* Navigation des onglets */}
        <div className="admin-card">
          <div className="tabs-navigation">
            {['dashboard', 'students', 'courses', 'chatbot', 'calendar', 'reports', 'settings'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'dashboard' && '📊 Tableau de bord'}
                {tab === 'students' && '👨‍🎓 Étudiants'}
                {tab === 'courses' && '📚 Cours'}
                {tab === 'chatbot' && '🤖 Chatbot'}
                {tab === 'calendar' && '📅 Calendrier'}
                {tab === 'reports' && '📈 Rapports'}
                {tab === 'settings' && '⚙️ Paramètres'}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
{activeTab === 'dashboard' && (
  <div className="admin-dashboard-content">
    {/* En-tête du tableau de bord */}
    <div className="dashboard-header">
      <div className="header-content">
        <h1>Tableau de Bord Administratif</h1>
        <p>Vue d'ensemble des performances et activités du système</p>
      </div>
      <div className="header-actions">
        <button className="header-btn primary">
          📊 Exporter le rapport
        </button>
        <button className="header-btn secondary">
          🔔 Alertes (3)
        </button>
      </div>
    </div>

    {/* Cartes de statistiques */}
    <div className="stats-grid">
      <div className="stat-card primary">
        <div className="stat-icon">
          <div className="icon-wrapper">
            👥
          </div>
        </div>
        <div className="stat-content">
          <h3>{usersData.length}</h3>
          <p>Utilisateurs totaux</p>
          <div className="stat-trend positive">
            <span>↑ 12%</span>
            <small>vs mois dernier</small>
          </div>
        </div>
      </div>

      <div className="stat-card success">
        <div className="stat-icon">
          <div className="icon-wrapper">
            🎓
          </div>
        </div>
        <div className="stat-content">
          <h3>{studentsData.length}</h3>
          <p>Étudiants inscrits</p>
          <div className="stat-trend positive">
            <span>↑ 8%</span>
            <small>vs mois dernier</small>
          </div>
        </div>
      </div>

      <div className="stat-card warning">
        <div className="stat-icon">
          <div className="icon-wrapper">
            📚
          </div>
        </div>
        <div className="stat-content">
          <h3>{coursesData.length}</h3>
          <p>Cours actifs</p>
          <div className="stat-trend neutral">
            <span>→ 0%</span>
            <small>vs mois dernier</small>
          </div>
        </div>
      </div>

      <div className="stat-card info">
        <div className="stat-icon">
          <div className="icon-wrapper">
            📈
          </div>
        </div>
        <div className="stat-content">
          <h3>89%</h3>
          <p>Taux d'engagement</p>
          <div className="stat-trend positive">
            <span>↑ 5%</span>
            <small>vs mois dernier</small>
          </div>
        </div>
      </div>
    </div>

    {/* Grille principale */}
    <div className="dashboard-grid">
      {/* Graphique de performance */}
      <div className="dashboard-card large">
        <div className="card-header">
          <h2>📈 Performance du Système</h2>
          <div className="card-actions">
            <select className="time-filter">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>3 derniers mois</option>
              <option>Cette année</option>
            </select>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-placeholder">
            <div className="chart-visual">
              <div className="chart-bars">
                {[65, 80, 45, 90, 75, 85, 70].map((height, index) => (
                  <div 
                    key={index} 
                    className="chart-bar" 
                    style={{ height: `${height}%` }}
                  >
                    <div className="bar-value">{height}%</div>
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mer</span>
                <span>Jeu</span>
                <span>Ven</span>
                <span>Sam</span>
                <span>Dim</span>
              </div>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color primary"></div>
              <span>Utilisation CPU</span>
            </div>
            <div className="legend-item">
              <div className="legend-color success"></div>
              <span>Mémoire</span>
            </div>
            <div className="legend-item">
              <div className="legend-color warning"></div>
              <span>Stockage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>🔄 Activité Récente</h2>
          <button className="view-all-btn">
            Voir tout
          </button>
        </div>
        <div className="activity-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'login' && '🔐'}
                {activity.type === 'update' && '✏️'}
                {activity.type === 'payment' && '💳'}
                {activity.type === 'support' && '🎫'}
                {activity.type === 'course' && '📚'}
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <h4>{activity.user}</h4>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <p className="activity-description">{activity.description}</p>
                {activity.status && (
                  <span className={`activity-status ${activity.status}`}>
                    {activity.status === 'success' && '✅ Succès'}
                    {activity.status === 'warning' && '⚠️ Attention'}
                    {activity.status === 'error' && '❌ Erreur'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métriques rapides */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>⚡ Métriques Rapides</h2>
        </div>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value">24h</div>
            <div className="metric-label">Temps moyen de session</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">92%</div>
            <div className="metric-label">Taux de satisfaction</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">15</div>
            <div className="metric-label">Tickets ouverts</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">2.3s</div>
            <div className="metric-label">Temps de réponse moyen</div>
          </div>
        </div>
      </div>

      {/* Alertes système */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>🚨 Alertes Système</h2>
          <span className="alert-count">3</span>
        </div>
        <div className="alerts-list">
          <div className="alert-item critical">
            <div className="alert-icon">🔴</div>
            <div className="alert-content">
              <h4>Stockage critique</h4>
              <p>Espace disque à 95% - Nettoyage requis</p>
              <span className="alert-time">Il y a 2h</span>
            </div>
          </div>
          <div className="alert-item warning">
            <div className="alert-icon">🟡</div>
            <div className="alert-content">
              <h4>Performance dégradée</h4>
              <p>Temps de réponse API supérieur à 5s</p>
              <span className="alert-time">Il y a 4h</span>
            </div>
          </div>
          <div className="alert-item info">
            <div className="alert-icon">🔵</div>
            <div className="alert-content">
              <h4>Mise à jour disponible</h4>
              <p>Nouvelle version v2.1.0 prête</p>
              <span className="alert-time">Il y a 1j</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
          {activeTab === 'students' && (
            <div className="admin-card">
              <div className="section-header">
                <h2>Gestion des Étudiants</h2>
                <button className="add-btn">+ Ajouter un étudiant</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Classe</th>
                    <th>Date d'inscription</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsData.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.class}</td>
                      <td>{student.enrollmentDate}</td>
                      <td>
                        <span className={student.status === 'active' ? 'status-active' : 'status-inactive'}>
                          {student.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-small">
                          <button className="edit-btn">Modifier</button>
                          <button className="delete-btn">Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="admin-card">
              <div className="section-header">
                <h2>Gestion des Cours</h2>
                <button className="add-btn">+ Créer un cours</button>
              </div>
              <div className="courses-grid">
                {coursesData.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <h3>{course.title}</h3>
                      <span className={`course-status ${course.status}`}>
                        {course.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                    <div className="course-info">
                      <p><strong>Enseignant:</strong> {course.instructor}</p>
                      <p><strong>Horaire:</strong> {course.schedule}</p>
                      <p><strong>Étudiants:</strong> {course.students}/{course.capacity}</p>
                    </div>
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(course.students / course.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span>{Math.round((course.students / course.capacity) * 100)}%</span>
                    </div>
                    <div className="course-actions">
                      <button className="action-btn-small edit">Modifier</button>
                      <button className="action-btn-small view">Voir détails</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chatbot' && (
            <div className="admin-card">
              <div className="section-header">
                <h2>Assistant Virtuel Chatbot</h2>
                <p className="chatbot-description">
                  Interface de gestion et de configuration de l'assistant virtuel pour répondre aux questions des étudiants.
                </p>
              </div>
              <div className="chatbot-interface">
                <ChatbotApp 
                  onBackToDashboard={handleBackToDashboard}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          )}

         {activeTab === 'calendar' && (
  <div className="calendar-container">
    {/* En-tête du calendrier */}
    <div className="calendar-header">
      <div className="calendar-header__main">
        <h1>Calendrier Académique</h1>
        <p>Gestion des événements et échéances de l'institution</p>
      </div>
      <div className="calendar-header__actions">
        <button className="calendar-action-btn primary">
          <span className="btn-icon">➕</span>
          Nouvel événement
        </button>
        <button className="calendar-action-btn secondary">
          <span className="btn-icon">📅</span>
          Vue mensuelle
        </button>
      </div>
    </div>

    {/* Contrôles du calendrier */}
    <div className="calendar-controls-panel">
      <div className="date-navigation">
        <button 
          className="nav-btn"
          onClick={() => navigateMonth(-1)}
        >
          <span className="nav-icon">‹</span>
          Mois précédent
        </button>
        
        <div className="current-period">
          <h2 className="current-month">
            {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </h2>
          <span className="current-week">Semaine {Math.ceil(selectedDate.getDate() / 7)}</span>
        </div>
        
        <button 
          className="nav-btn"
          onClick={() => navigateMonth(1)}
        >
          Mois suivant
          <span className="nav-icon">›</span>
        </button>
      </div>

      <div className="view-options">
        <div className="view-buttons">
          <button className="view-btn active">Mois</button>
          <button className="view-btn">Semaine</button>
          <button className="view-btn">Jour</button>
        </div>
        
        <div className="quick-actions">
          <button 
            className="quick-action-btn"
            onClick={() => setSelectedDate(new Date())}
          >
            Aujourd'hui
          </button>
        </div>
      </div>
    </div>

    {/* Statistiques rapides */}
    <div className="calendar-stats">
      <div className="stat-item">
        <div className="stat-value">{calendarEvents.length}</div>
        <div className="stat-label">Événements ce mois</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">
          {calendarEvents.filter(e => e.type === 'exam').length}
        </div>
        <div className="stat-label">Examens prévus</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">
          {calendarEvents.filter(e => e.type === 'deadline').length}
        </div>
        <div className="stat-label">Échéances</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">
          {calendarEvents.filter(e => new Date(e.date) > new Date()).length}
        </div>
        <div className="stat-label">À venir</div>
      </div>
    </div>

    {/* Grille du calendrier */}
    <div className="calendar-wrapper">
      <div className="calendar-grid">
        {/* En-têtes des jours */}
        <div className="calendar-weekdays">
          {['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(day => (
            <div key={day} className="weekday-header">
              <span className="weekday-name">{day}</span>
              <span className="weekday-short">{day.substring(0, 3)}</span>
            </div>
          ))}
        </div>
        
        {/* Jours du mois */}
        <div className="calendar-days-grid">
          {Array.from({ length: getFirstDayOfMonth(selectedDate) }, (_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty">
              <div className="day-content">
                <span className="day-number muted"></span>
              </div>
            </div>
          ))}
          
          {Array.from({ length: getDaysInMonth(selectedDate) }, (_, i) => {
            const day = i + 1;
            const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
            const isToday = currentDate.toDateString() === new Date().toDateString();
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
            const dayEvents = getEventsForDay(day);
            
            return (
              <div 
                key={day} 
                className={`calendar-day ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
              >
                <div className="day-content">
                  <div className="day-header">
                    <span className={`day-number ${isToday ? 'today-badge' : ''}`}>
                      {day}
                    </span>
                    {isToday && <span className="today-label">Aujourd'hui</span>}
                  </div>
                  
                  <div className="day-events">
                    {dayEvents.slice(0, 3).map(event => (
                      <div 
                        key={event.id} 
                        className={`calendar-event event-${event.type}`}
                        title={`${event.title} - ${event.time}`}
                      >
                        <div className="event-indicator"></div>
                        <div className="event-content">
                          <div className="event-icon">
                            {getEventTypeIcon(event.type)}
                          </div>
                          <div className="event-details">
                            <span className="event-title">{event.title}</span>
                            <span className="event-time">{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {dayEvents.length > 3 && (
                      <div className="more-events-indicator">
                        +{dayEvents.length - 3} événement(s)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Panneau latéral des événements à venir */}
      <div className="calendar-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <span className="title-icon">📅</span>
            Événements à venir
          </h3>
          <div className="upcoming-events">
            {calendarEvents
              .filter(event => new Date(event.date) >= new Date())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="upcoming-event">
                  <div className={`event-type-badge type-${event.type}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="event-info">
                    <h4 className="event-name">{event.title}</h4>
                    <div className="event-meta">
                      <span className="event-date">
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                      <span className="event-time">{event.time}</span>
                    </div>
                    {event.course && (
                      <span className="event-course">{event.course}</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Légende */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <span className="title-icon">🎨</span>
            Légende
          </h3>
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color exam"></div>
              <div className="legend-info">
                <span className="legend-label">Examen</span>
                <span className="legend-count">
                  {calendarEvents.filter(e => e.type === 'exam').length}
                </span>
              </div>
            </div>
            <div className="legend-item">
              <div className="legend-color meeting"></div>
              <div className="legend-info">
                <span className="legend-label">Réunion</span>
                <span className="legend-count">
                  {calendarEvents.filter(e => e.type === 'meeting').length}
                </span>
              </div>
            </div>
            <div className="legend-item">
              <div className="legend-color lab"></div>
              <div className="legend-info">
                <span className="legend-label">TP/Lab</span>
                <span className="legend-count">
                  {calendarEvents.filter(e => e.type === 'lab').length}
                </span>
              </div>
            </div>
            <div className="legend-item">
              <div className="legend-color conference"></div>
              <div className="legend-info">
                <span className="legend-label">Conférence</span>
                <span className="legend-count">
                  {calendarEvents.filter(e => e.type === 'conference').length}
                </span>
              </div>
            </div>
            <div className="legend-item">
              <div className="legend-color deadline"></div>
              <div className="legend-info">
                <span className="legend-label">Deadline</span>
                <span className="legend-count">
                  {calendarEvents.filter(e => e.type === 'deadline').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Actions rapides */}
    <div className="calendar-actions">
      <button className="action-btn">
        <span className="action-icon">📥</span>
        Exporter le calendrier
      </button>
      <button className="action-btn">
        <span className="action-icon">🖨️</span>
        Imprimer
      </button>
      <button className="action-btn">
        <span className="action-icon">🔔</span>
        Gérer les notifications
      </button>
    </div>
  </div>
)}
        {activeTab === 'reports' && (
  <div className="admin-card">
    <div className="card-header">
      <h2>Tableau de Bord Analytics</h2>
      <div className="header-actions">
        <button className="btn-icon" title="Actualiser">
          <span className="icon">🔄</span>
        </button>
        <div className="date-range-picker">
          <span className="icon">📅</span>
          <span>7 derniers jours</span>
          <span className="icon">▼</span>
        </div>
      </div>
    </div>

    {/* Métriques en temps réel avec indicateurs de tendance */}
    <div className="metrics-grid">
      <div className="metric-card trending-up">
        <div className="metric-header">
          <span className="metric-icon">🖥️</span>
          <span className="trend-indicator">+2.1%</span>
        </div>
        <div className="metric-value">98.5%</div>
        <div className="metric-label">Uptime Serveur</div>
        <div className="metric-progress">
          <div className="progress-bar" style={{width: '98.5%'}}></div>
        </div>
      </div>

      <div className="metric-card trending-down">
        <div className="metric-header">
          <span className="metric-icon">⚡</span>
          <span className="trend-indicator">-0.3s</span>
        </div>
        <div className="metric-value">2.3s</div>
        <div className="metric-label">Temps de réponse moyen</div>
        <div className="metric-progress">
          <div className="progress-bar" style={{width: '85%'}}></div>
        </div>
      </div>

      <div className="metric-card trending-up">
        <div className="metric-header">
          <span className="metric-icon">💾</span>
          <span className="trend-indicator">+5%</span>
        </div>
        <div className="metric-value">45GB</div>
        <div className="metric-label">Stockage utilisé</div>
        <div className="storage-details">
          <span>128GB total</span>
        </div>
      </div>

      <div className="metric-card trending-up">
        <div className="metric-header">
          <span className="metric-icon">📊</span>
          <span className="trend-indicator">+12%</span>
        </div>
        <div className="metric-value">1.2K</div>
        <div className="metric-label">Requêtes/heure</div>
        <div className="metric-change">vs période précédente</div>
      </div>
    </div>

    {/* Graphique en temps réel */}
    <div className="chart-container">
      <div className="chart-header">
        <h3>Activité en temps réel</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color requests"></div>
            Requêtes
          </div>
          <div className="legend-item">
            <div className="legend-color errors"></div>
            Erreurs
          </div>
        </div>
      </div>
      <div className="realtime-chart">
        {/* Intégration graphique simulée */}
        <div className="chart-placeholder">
          <div className="chart-grid">
            <div className="grid-line"></div>
            <div className="grid-line"></div>
            <div className="grid-line"></div>
          </div>
          <div className="data-line requests-line"></div>
          <div className="data-line errors-line"></div>
        </div>
        <div className="chart-time-labels">
          <span>14:00</span>
          <span>15:00</span>
          <span>16:00</span>
          <span>17:00</span>
          <span>18:00</span>
        </div>
      </div>
    </div>

    {/* Actions rapides et export */}
    <div className="actions-panel">
      <div className="quick-actions">
        <button className="btn-primary">
          <span className="icon">📥</span>
          Exporter CSV
        </button>
        <button className="btn-secondary">
          <span className="icon">📄</span>
          Générer PDF
        </button>
        <button className="btn-outline">
          <span className="icon">🔗</span>
          Partager rapport
        </button>
      </div>
      
      <div className="ai-insights">
        <div className="insight-header">
          <span className="icon">✨</span>
          <span>Insights IA</span>
        </div>
        <div className="insight-content">
          <p>📈 Pic d'activité détecté à 14h30 - +25% de trafic</p>
          <p>⚡ Performance optimale - tous les systèmes stables</p>
        </div>
      </div>
    </div>

    {/* Filtres avancés */}
    <div className="filters-section">
      <div className="filter-group">
        <label>Période</label>
        <select className="filter-select">
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
          <option>24 dernières heures</option>
          <option>Personnalisé</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Métriques</label>
        <select className="filter-select">
          <option>Toutes les métriques</option>
          <option>Performance uniquement</option>
          <option>Stockage uniquement</option>
        </select>
      </div>
      <button className="btn-apply-filters">
        Appliquer les filtres
      </button>
    </div>

    {/* Alertes et notifications */}
    <div className="alerts-section">
      <div className="alert-info">
        <span className="alert-icon">💡</span>
        <div className="alert-content">
          <strong>Conseil de performance</strong>
          <p>Optimisez le cache pour réduire le temps de réponse de 15%</p>
        </div>
      </div>
    </div>
  </div>
)}
         {activeTab === 'settings' && (
  <div className="admin-dashboard">
    {/* Profil Administrateur */}
    <div className="admin-profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            <span>👨‍💼</span>
          </div>
          <div className="status-indicator online"></div>
        </div>
        <div className="profile-info">
          <h3>Administrateur Système</h3>
          <p className="profile-role">Super Administrateur</p>
          <p className="profile-email">admin@entreprise.com</p>
          <div className="profile-stats">
            <span>📅 Dernière connexion: Aujourd'hui, 14:30</span>
            <span>🔐 Niveau d'accès: Maximum</span>
          </div>
        </div>
        <button className="edit-profile-btn">✏️ Modifier le profil</button>
      </div>
      
      {/* Informations supplémentaires du profil */}
      <div className="profile-details">
        <div className="detail-item">
          <strong>📞 Téléphone:</strong>
          <span>+33 1 23 45 67 89</span>
        </div>
        <div className="detail-item">
          <strong>🏢 Département:</strong>
          <span>IT & Systèmes</span>
        </div>
        <div className="detail-item">
          <strong>🔑 Permissions:</strong>
          <span>Full Access</span>
        </div>
      </div>
    </div>

    <div className="admin-grid">
      {/* Carte des Paramètres Système */}
      <div className="admin-card system-settings">
        <h2>⚙️ Paramètres Système</h2>
        <div className="action-buttons-grid">
          <button className="action-btn featured">
            <div className="btn-icon">🌐</div>
            <span>Paramètres Généraux</span>
            <small>Configuration de base du système</small>
          </button>
          
          <button className="action-btn featured">
            <div className="btn-icon">🔐</div>
            <span>Sécurité et Accès</span>
            <small>Gestion des permissions</small>
          </button>
          
          <button className="action-btn featured">
            <div className="btn-icon">📧</div>
            <span>Notifications</span>
            <small>Alertes et emails</small>
          </button>
          
          <button className="action-btn featured">
            <div className="btn-icon">💾</div>
            <span>Sauvegarde des données</span>
            <small>Backup automatique</small>
          </button>
          
          <button className="action-btn featured">
            <div className="btn-icon">🔧</div>
            <span>Maintenance</span>
            <small>Outils système</small>
          </button>
          
          <button className="action-btn featured">
            <div className="btn-icon">📊</div>
            <span>Analytics</span>
            <small>Statistiques d'usage</small>
          </button>
        </div>
      </div>

      {/* Carte des Paramètres Avancés */}
      <div className="admin-card advanced-settings">
        <h2>🚀 Paramètres Avancés</h2>
        <div className="settings-grid">
          <div className="setting-item">
            <label>Mode de maintenance</label>
            <div className="toggle-switch">
              <input type="checkbox" id="maintenance-mode" />
              <label htmlFor="maintenance-mode"></label>
            </div>
          </div>
          
          <div className="setting-item">
            <label>Logs détaillés</label>
            <div className="toggle-switch">
              <input type="checkbox" id="detailed-logs" defaultChecked />
              <label htmlFor="detailed-logs"></label>
            </div>
          </div>
          
          <div className="setting-item">
            <label>Backup automatique</label>
            <select className="setting-select">
              <option>Quotidien</option>
              <option>Hebdomadaire</option>
              <option>Mensuel</option>
              <option>Désactivé</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label>Niveau de sécurité</label>
            <select className="setting-select">
              <option>Standard</option>
              <option>Élevé</option>
              <option>Maximum</option>
            </select>
          </div>
        </div>
        
        {/* Section upload avatar */}
        <div className="avatar-upload-section">
          <h4>🖼️ Photo de profil</h4>
          <div className="upload-area">
            <div className="upload-placeholder">
              <span>👨‍💼</span>
              <p>Glissez-déposez votre photo ou</p>
            </div>
            <input 
              type="file" 
              id="avatar-upload" 
              accept="image/*" 
              className="file-input"
            />
            <label htmlFor="avatar-upload" className="upload-btn">
              Choisir un fichier
            </label>
          </div>
        </div>
      </div>

      {/* Carte Statut Système */}
      <div className="admin-card system-status">
        <h2>📈 Statut du Système</h2>
        <div className="status-grid">
          <div className="status-item">
            <div className="status-indicator good"></div>
            <span>Serveur Web</span>
            <small>En ligne</small>
          </div>
          <div className="status-item">
            <div className="status-indicator good"></div>
            <span>Base de données</span>
            <small>Optimale</small>
          </div>
          <div className="status-item">
            <div className="status-indicator warning"></div>
            <span>Stockage</span>
            <small>75% utilisé</small>
          </div>
          <div className="status-item">
            <div className="status-indicator good"></div>
            <span>Sécurité</span>
            <small>Protégé</small>
          </div>
        </div>
        
        <div className="performance-metrics">
          <div className="metric">
            <label>CPU</label>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '45%'}}></div>
            </div>
            <span>45%</span>
          </div>
          <div className="metric">
            <label>Mémoire</label>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '68%'}}></div>
            </div>
            <span>68%</span>
          </div>
          <div className="metric">
            <label>Stockage</label>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '75%'}}></div>
            </div>
            <span>75%</span>
          </div>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="admin-card quick-actions">
        <h2>⚡ Actions Rapides</h2>
        <div className="quick-actions-grid">
          <button className="quick-btn primary">
            <span>🔄</span>
            Redémarrer les services
          </button>
          <button className="quick-btn secondary">
            <span>🧹</span>
            Nettoyer les caches
          </button>
          <button className="quick-btn warning">
            <span>📋</span>
            Vérifier les logs
          </button>
          <button className="quick-btn danger">
            <span>🚨</span>
            Mode urgence
          </button>
        </div>
        
        {/* Session Info */}
        <div className="session-info">
          <h4>💻 Session Actuelle</h4>
          <div className="session-details">
            <div className="session-item">
              <strong>IP:</strong>
              <span>192.168.1.100</span>
            </div>
            <div className="session-item">
              <strong>Navigateur:</strong>
              <span>Chrome 119.0.6045.160</span>
            </div>
            <div className="session-item">
              <strong>Connexion:</strong>
              <span>Depuis 2h 15min</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="admin-hint warning">
      <div className="hint-icon">⚠️</div>
      <div>
        <strong>Privilèges élevés requis</strong>
        <p>Les modifications des paramètres système nécessitent des autorisations administratives complètes</p>
      </div>
    </div>

    <div className="admin-hint info">
      <div className="hint-icon">💡</div>
      <div>
        <strong>Bonnes pratiques</strong>
        <p>Sauvegardez toujours vos configurations avant de modifier les paramètres critiques</p>
      </div>
    </div>
  </div>
)} 
        </div>
      </div>
    );
  }

  // Page de login normale
  return (
    <div className="container">
      <div className="left-section">
        <h3 className="logo">• Anywhere app.</h3>

        <div className="form-box">
          <p className="subtitle">START FOR FREE</p>
          <h1>
            Create new <br /> account<span className="dot">.</span>
          </h1>
          
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="First Name" 
              value={formData.firstName}
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={formData.lastName}
              onChange={handleChange}
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
            />
            <div className="btn-group">
              <button type="submit" className="btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="right-section"></div>
    </div>
  );
}

export default App;