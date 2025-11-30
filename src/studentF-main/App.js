import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/common/Navbar';
import StudentList from './components/Student/StudentList';
import StudentForm from './components/Student/StudentForm';
import StudentSearch from './components/Student/StudentSearch';
import UniversityList from './components/University/UniversityList';
import UniversityForm from './components/University/UniversityForm';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Vérifier la préférence système ou le localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Appliquer le thème au document
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/students/search" element={<StudentSearch />} />
            <Route path="/universities" element={<UniversityList />} />
            <Route path="/universities/new" element={<UniversityForm />} />
            <Route path="/universities/edit/:id" element={<UniversityForm />} />
          </Routes>
        </div>
        
        {/* Bouton de toggle theme */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </Router>
  );
}

export default App;