import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { universityService } from '../../services/universityService';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await universityService.getAllUniversities();
      
      if (response && response.data && Array.isArray(response.data)) {
        setUniversities(response.data);
      } else {
        setUniversities([]);
        setError('Format de données inattendu');
      }
    } catch (err) {
      setError('Erreur lors du chargement des universités');
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette université ?')) {
      try {
        await universityService.deleteUniversity(id);
        setUniversities(universities.filter(university => university.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression de l\'université');
      }
    }
  };

  if (loading) return <Loading message="Chargement des universités..." />;

  return (
    <div className="student-container">
      <div className="student-content student-fade-in">
        <div className="student-main-header">
          <h1 className="student-main-title">Gestion des Universités</h1>
          <div className="student-main-actions">
            <Link to="/universities/new" className="btn-student-primary">
              <span>+</span> NOUVELLE UNIVERSITÉ
            </Link>
          </div>
        </div>

        <div className="student-main-card">
          <div className="student-card-header">
            <h2 className="student-card-title">
              {universities.length} université(s) trouvée(s)
            </h2>
          </div>
          <div className="student-card-body">
            <ErrorMessage 
              message={error} 
              onRetry={loadUniversities}
              onClose={() => setError('')}
            />

            {universities && universities.length > 0 ? (
              <div className="student-table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>NOM</th>
                      <th>LOCALISATION</th>
                      <th>ÉTUDIANTS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universities.map(university => (
                      <tr key={university.id}>
                        <td>
                          <strong>{university.name}</strong>
                        </td>
                        <td>{university.location || 'Non spécifiée'}</td>
                        <td>
                          <span style={{
                            background: '#3498db',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {university.students ? university.students.length : 0}
                          </span>
                        </td>
                        <td>
                          <div className="student-actions">
                            <Link 
                              to={`/universities/edit/${university.id}`} 
                              className="btn-action btn-edit"
                            >
                              Modifier
                            </Link>
                            <button
                              onClick={() => handleDelete(university.id)}
                              className="btn-action btn-delete"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="student-empty-state">
                <div className="student-empty-icon">🏛️</div>
                <div className="student-empty-title">Aucune université trouvée</div>
                <div className="student-empty-text">
                  Commencez par ajouter votre première université.
                </div>
                <Link to="/universities/new" className="btn-student-primary" style={{marginTop: '20px'}}>
                  AJOUTER UNE UNIVERSITÉ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityList;