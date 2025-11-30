import React from 'react';

/**
 * Composant de chargement réutilisable
 */
const Loading = ({ message = 'Chargement...', size = 'md' }) => {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }[size];

  return (
    <div className="d-flex justify-content-center align-items-center py-4">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
      {message && <span className="ms-2">{message}</span>}
    </div>
  );
};

export default Loading;