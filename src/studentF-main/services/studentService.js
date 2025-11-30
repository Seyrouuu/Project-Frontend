import api from './apiConfig';

export const studentService = {
  getAllStudents: () => api.get('/students'),
  getStudentById: (id) => api.get(`/students/${id}`),
  createStudent: (student) => api.post('/students', student),
  updateStudent: (id, student) => api.put(`/students/${id}`, student),
  deleteStudent: (id) => api.delete(`/students/${id}`),
  searchStudents: (params) => api.get('/students/search', { params }),
  getStudentsByUniversity: (universityName) => api.get(`/students/university/${universityName}`),
  getStudentByEmail: (email) => api.get(`/students/email/${email}`),
};