import React from 'react';
import { useNavigate } from 'react-router-dom';
import notImg from '../../assets/img/no-results.png';

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/personalinfo');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      textAlign: 'center' 
    }}>
      <img 
        alt='notfound' 
        src={notImg} 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '70vh', 
          marginBottom: '20px'
        }} 
      />
      <button 
        onClick={goToHomePage} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff'
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
};
