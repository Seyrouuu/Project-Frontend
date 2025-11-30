import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { universityService } from '../../services/universityService';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    university: null
  });
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const isEdit = Boolean(id);

  // Fonction pour valider l'email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction pour gérer les erreurs API
  const handleApiError = (error) => {
    if (error.response) {
      return error.response.data || `Erreur ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      return 'Impossible de contacter le serveur. Vérifiez votre connexion.';
    } else {
      return 'Une erreur inattendue est survenue.';
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setPageLoading(true);
        
        // Charger les universités
        const universitiesResponse = await universityService.getAllUniversities();
        setUniversities(universitiesResponse.data);

        // Si mode édition, charger l'étudiant
        if (isEdit) {
          const studentResponse = await studentService.getStudentById(id);
          const student = studentResponse.data;
          
          setFormData({
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            email: student.email || '',
            university: student.university || null
          });
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Error loading initial data:', err);
      } finally {
        setPageLoading(false);
      }
    };

    loadInitialData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUniversityChange = (e) => {
    const universityId = e.target.value;
    
    if (universityId) {
      const university = universities.find(u => u.id === parseInt(universityId));
      setFormData(prev => ({
        ...prev,
        university: university || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        university: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'Le prénom est obligatoire';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Le nom est obligatoire';
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est obligatoire';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.createStudent(formData);
      }
      
      navigate('/students');
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  if (pageLoading) {
    return <Loading message="Chargement..." />;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <div className="card shadow-sm">
          <div className="card-header bg-white py-3">
            <h2 className="h5 mb-0">
              {isEdit ? 'Modifier l\'étudiant' : 'Créer un nouvel étudiant'}
            </h2>
          </div>
          
          <div className="card-body p-4">
            {error && (
              <ErrorMessage 
                message={error} 
                onClose={() => setError('')}
              />
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    Prénom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  {formErrors.firstName && (
                    <div className="invalid-feedback">{formErrors.firstName}</div>
                  )}
                </div>
                
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Nom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  {formErrors.lastName && (
                    <div className="invalid-feedback">{formErrors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                {formErrors.email && (
                  <div className="invalid-feedback">{formErrors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="university" className="form-label">
                  Université
                </label>
                <select
                  className="form-select"
                  id="university"
                  value={formData.university?.id || ''}
                  onChange={handleUniversityChange}
                  disabled={loading}
                >
                  <option value="">Sélectionner une université...</option>
                  {universities.map(university => (
                    <option key={university.id} value={university.id}>
                      {university.name} {university.location && `- ${university.location}`}
                    </option>
                  ))}
                </select>
                <div className="form-text">
                  Optionnel - vous pourrez assigner une université plus tard
                </div>
              </div>

              <div className="d-flex gap-2 pt-3 border-top">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      {isEdit ? 'Modification...' : 'Création...'}
                    </>
                  ) : (
                    isEdit ? 'Modifier' : 'Créer'
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;