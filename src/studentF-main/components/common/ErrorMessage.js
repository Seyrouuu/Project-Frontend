import React from 'react';

/**
 * Composant pour afficher les messages d'erreur
 */
const ErrorMessage = ({ message, onRetry, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Erreur :</strong> {message}
      
      <div className="mt-2">
        {onRetry && (
          <button 
            type="button" 
            className="btn btn-sm btn-outline-danger me-2"
            onClick={onRetry}
          >
            Réessayer
          </button>
        )}
        
        {onClose && (
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;