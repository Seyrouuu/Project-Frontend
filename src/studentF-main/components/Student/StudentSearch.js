import React, { useState } from 'react';
import { studentService } from '../../services/studentService';

const StudentSearch = () => {
  const [searchParams, setSearchParams] = useState({
    firstName: '',
    lastName: '',
    email: '',
    universityName: ''
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Remove empty parameters
      const params = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
      );
      
      const response = await studentService.searchStudents(params);
      setStudents(response.data);
    } catch (err) {
      console.error('Error searching students:', err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchParams({
      firstName: '',
      lastName: '',
      email: '',
      universityName: ''
    });
    setStudents([]);
  };

  return (
    <div className="student-container">
      <div className="student-content student-fade-in">
        <div className="student-main-header">
          <h1 className="student-main-title">Search Students</h1>
        </div>

        <div className="student-main-card">
          <div className="student-card-header">
            <h2 className="student-card-title">Search Criteria</h2>
          </div>
          <div className="student-card-body">
            <form onSubmit={handleSearch}>
              <div className="search-form-grid">
                <div className="form-group-student">
                  <label className="form-label-student">First Name</label>
                  <input
                    type="text"
                    className="form-control-student"
                    name="firstName"
                    value={searchParams.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="form-group-student">
                  <label className="form-label-student">Last Name</label>
                  <input
                    type="text"
                    className="form-control-student"
                    name="lastName"
                    value={searchParams.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="form-group-student">
                  <label className="form-label-student">Email</label>
                  <input
                    type="email"
                    className="form-control-student"
                    name="email"
                    value={searchParams.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="form-group-student">
                  <label className="form-label-student">University Name</label>
                  <input
                    type="text"
                    className="form-control-student"
                    name="universityName"
                    value={searchParams.universityName}
                    onChange={handleChange}
                    placeholder="Enter university name"
                  />
                </div>
              </div>
              
              <div className="search-actions">
                <button type="submit" className="btn-student-primary" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
                <button type="button" className="btn-student-secondary" onClick={clearSearch}>
                  Clear
                </button>
              </div>
            </form>

            {students.length > 0 && (
              <div className="student-table-wrapper" style={{marginTop: '30px'}}>
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>University</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>{student.university ? student.university.name : 'No University'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {students.length === 0 && !loading && (
              <div className="student-empty-state">
                <div className="student-empty-icon">🔍</div>
                <div className="student-empty-title">No students found</div>
                <div className="student-empty-text">Try different search criteria</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;