import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    // S'assurer que la réponse a la bonne structure
    if (response && response.data !== undefined) {
      return response;
    }
    // Si la réponse n'a pas la structure attendue, la normaliser
    return {
      ...response,
      data: response.data || []
    };
  },
  (error) => {
    console.error('API Error:', error);
    
    // Retourner une réponse normalisée même en cas d'erreur
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      // Pas de réponse du serveur
      return Promise.reject(new Error('Impossible de contacter le serveur'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;