import api from './apiConfig';

export const universityService = {
  getAllUniversities: async () => {
    try {
      const response = await api.get('/universities');
      // S'assurer que nous retournons toujours un tableau
      if (response && response.data) {
        return { 
          data: Array.isArray(response.data) ? response.data : [] 
        };
      }
      return { data: [] };
    } catch (error) {
      console.error('Error in universityService.getAllUniversities:', error);
      // Retourner un tableau vide en cas d'erreur
      return { data: [] };
    }
  },
  
  getUniversityById: (id) => api.get(`/universities/${id}`),
  
  createUniversity: (universityData) => api.post('/universities', universityData),
  
  updateUniversity: (id, universityData) => api.put(`/universities/${id}`, universityData),
  
  deleteUniversity: (id) => api.delete(`/universities/${id}`),
  
  getUniversityByName: (name) => api.get('/universities/search', { params: { name } }),
};