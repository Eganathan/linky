
import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-message glass-card">
      <span>⚠️ {message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default ErrorMessage;
