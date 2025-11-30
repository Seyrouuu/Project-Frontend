import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import Loading from '../common/Loading';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      setStudents(response.data);
    } catch (err) {
      setError('Error loading students');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setStudents(students.filter(student => student.id !== id));
      } catch (err) {
        setError('Error deleting student');
        console.error('Error deleting student:', err);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="student-container">
      <div className="student-content student-fade-in">
        <div className="student-main-header">
          <h1 className="student-main-title">Students</h1>
          <div className="student-main-actions">
            <Link to="/students/new" className="btn-student-primary">
              <span>+</span> ADD NEW STUDENT
            </Link>
          </div>
        </div>

        <div className="student-main-card">
          <div className="student-card-header">
            <h2 className="student-card-title">Student List</h2>
          </div>
          <div className="student-card-body">
            {error && (
              <div className="student-error">
                Error loading students
              </div>
            )}

            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>UNIVERSITY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map(student => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>{student.university ? student.university.name : 'No University'}</td>
                        <td>
                          <div className="student-actions">
                            <Link 
                              to={`/students/edit/${student.id}`} 
                              className="btn-action btn-edit"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(student.id)}
                              className="btn-action btn-delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="student-empty-state">
                          <div className="student-empty-icon">📊</div>
                          <div className="student-empty-title">No students found</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;