import React from 'react';
import { Link } from 'react-router-dom';
import './ForbiddenPage.css';
import { useNavigate  } from 'react-router-dom';

function ForbiddenPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">403</h1>
      <p className="not-found-message">Sorry, you don't have permission to access this page.</p>
      <button onClick={handleGoBack} className="not-found-back-button">Go Back</button>
    </div>
  );
}

export default ForbiddenPage;
