import React from 'react';
import '../styles/StatCards.css';

const Observations = ({ totalObservations = 0 }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">Observations</h3>
      </div>
      <div className="stat-card-content">
        <div className="stat-number">{totalObservations.toLocaleString()}</div>
        <p className="stat-description">Total number of observations recorded</p>
      </div>
    </div>
  );
};

export default Observations;
