// Fonctions utilitaires pour l'application

// Formater une date
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

// Valider un email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Gérer les erreurs API
export const handleApiError = (error) => {
  if (error.response) {
    // Erreur du serveur
    return error.response.data || `Erreur ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    // Pas de réponse du serveur
    return 'Impossible de contacter le serveur. Vérifiez votre connexion.';
  } else {
    // Erreur de configuration
    return 'Une erreur inattendue est survenue.';
  }
};

// Débounce function pour les recherches
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};