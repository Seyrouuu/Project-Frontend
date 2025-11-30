import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { universityService } from '../../services/universityService';

const UniversityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUniversityData = async () => {
      if (isEdit) {
        try {
          const response = await universityService.getUniversityById(id);
          const university = response.data;
          setFormData({
            name: university.name,
            location: university.location || ''
          });
        } catch (err) {
          setError('Error loading university');
        }
      }
    };

    loadUniversityData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await universityService.updateUniversity(id, formData);
      } else {
        await universityService.createUniversity(formData);
      }
      navigate('/universities');
    } catch (err) {
      setError(err.response?.data || 'Error saving university');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-container">
      <div className="student-content student-fade-in">
        <div className="student-main-header">
          <h1 className="student-main-title">
            {isEdit ? 'Edit University' : 'Create New University'}
          </h1>
        </div>

        <div className="student-main-card">
          <div className="student-card-header">
            <h2 className="student-card-title">University Information</h2>
          </div>
          <div className="student-card-body">
            {error && (
              <div className="student-error">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="search-form-grid" style={{gridTemplateColumns: '1fr'}}>
                <div className="form-group-student">
                  <label className="form-label-student">University Name</label>
                  <input
                    type="text"
                    className="form-control-student"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter university name"
                  />
                </div>

                <div className="form-group-student">
                  <label className="form-label-student">Location</label>
                  <input
                    type="text"
                    className="form-control-student"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location (optional)"
                  />
                </div>
              </div>

              <div className="search-actions">
                <button
                  type="submit"
                  className="btn-student-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
                </button>
                <button
                  type="button"
                  className="btn-student-secondary"
                  onClick={() => navigate('/universities')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityForm;