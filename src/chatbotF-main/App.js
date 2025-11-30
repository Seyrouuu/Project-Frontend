import React from 'react';
import Chatbot from './Chatbot'; // Vérifiez que ce chemin est correct

const ChatbotApp = ({ onBackToDashboard, onLogout }) => {
  console.log('ChatbotApp - Props reçues:', { 
    onBackToDashboard: typeof onBackToDashboard,
    onLogout: typeof onLogout 
  });

  return (
    <div>
      {/* DEBUG : Afficher si les props sont bien reçues */}
      <div style={{display: 'none'}}>
        Props: {typeof onBackToDashboard} | {typeof onLogout}
      </div>
      
      {/* PASSER les props à Chatbot */}
      <Chatbot 
        onBackToDashboard={onBackToDashboard}
        onLogout={onLogout}
      />
    </div>
  );
};

export default ChatbotApp;